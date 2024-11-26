import path from "path"
import { publishOptionsSchema } from "@/src/commands/publish"
import { ERRORS } from "@/src/utils/errors"
import { highlighter } from "@/src/utils/hightlighter"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import fs from "fs-extra"
import { z } from "zod"
import { loadRegistryConfig } from "../utils/loader"

export async function preFlightPublish(
  options: z.infer<typeof publishOptionsSchema>,
) {
  const errors: Record<string, boolean> = {}
  const projectSpinner = spinner(`Preflight checks.`).start()

  // Ensure target directory exists.
  // Check for empty project. We assume if no package.json exists, the project is empty.
  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.resolve(options.cwd, "package.json"))
  ) {
    projectSpinner?.fail()
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      projectInfo: null,
    }
  }

  if (!fs.existsSync(path.resolve(options.cwd, "registry.config.ts"))) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `A ${highlighter.info(
        "registry.config.ts",
      )} file doesn't exist at ${highlighter.info(
        options.cwd,
      )}.\nTo start over, run ${highlighter.warn("`init`")}.`,
    )
    logger.break()
    process.exit(1)
  }

  const { config, errors: getRegistryErrors } =
    await loadRegistryConfig(options)
  const outputDir = config?.outputDir || "shadreg"
  if (!fs.existsSync(path.resolve(options.cwd, outputDir))) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `A ${highlighter.info(outputDir)} directory doesn't exist at ${highlighter.info(
        options.cwd,
      )}.\nTo start over, run ${highlighter.warn("`build`")}.`,
    )
    logger.break()
    process.exit(1)
  }

  if (fs.readdirSync(path.resolve(options.cwd, outputDir)).length === 0) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `The ${highlighter.info(outputDir)} directory is empty.\nTo start over, please registry your component in config file and run ${highlighter.warn(
        "`build`",
      )}.`,
    )
    logger.break()
    process.exit(1)
  }

  projectSpinner?.succeed()

  return {
    errors,
  }
}
