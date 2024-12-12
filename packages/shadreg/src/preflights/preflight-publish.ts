import path from "path"
import { publishOptionsSchema } from "@/src/commands/publish"
import { errorHandler, ERRORS } from "@/src/utils/errors"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import fs from "fs-extra"
import { z } from "zod"
import { shadregExplorer } from "../utils/cosmiconfig"
import { RegistryConfig } from "../config-schema"
import { list } from "@vercel/blob"
import { highlighter } from "../utils/hightlighter"

export async function preFlightPublish(
  options: z.infer<typeof publishOptionsSchema>,
) {
  const projectSpinner = spinner(`Preflight checks.`).start()

  // Ensure target directory exists.
  // Check for empty project. We assume if no package.json exists, the project is empty.
  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.resolve(options.cwd, "package.json"))
  ) {
    projectSpinner.fail()
    errorHandler(ERRORS.MISSING_DIR_OR_EMPTY_PROJECT)
  }

  // Check if vercel token is valid
  try {
    const { blobs } = await list()
  } catch (error) {
    logger.break()
    projectSpinner.fail(highlighter.error((error as Error).message))
    process.exit(1)
  }

  // Check if config file already exists
  const config = (await shadregExplorer
    .search(options.cwd)
    .then((result) => result?.config)) as RegistryConfig

  if (!config) {
    logger.break()
    logger.error("No config file found in the current working directory.")
    projectSpinner.fail('To start over, please run "init" command first.')
    process.exit(1)
  }

  const outputDir = config?.outputDir || "shadreg"
  if (
    !fs.existsSync(path.resolve(options.cwd, outputDir, "./_generated.json")) ||
    fs.readJSONSync(path.resolve(options.cwd, outputDir, "./_generated.json"))
      .length === 0
  ) {
    logger.break()
    logger.error("You haven't generated anything yet")
    projectSpinner?.fail('To start over, please run "build" command first')
    process.exit(1)
  }

  projectSpinner?.succeed()
}
