import { z } from "zod"
import fs from "fs-extra"
import path from "path"
import { buildOptionSchema } from "../commands/build"
import { logger } from "@/src/utils/logger"
import { errorHandler, ERRORS } from "@/src/utils/errors"
import { spinner } from "../utils/spinner"
import { shadregExplorer } from "../utils/cosmiconfig"

export const preflightBuild = async (
  options: z.infer<typeof buildOptionSchema>,
) => {
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

  // Check if config file already exists
  const configFile = await shadregExplorer
    .search(options.cwd)
    .then((result) => result?.filepath.split("/").pop())
  if (!configFile) {
    logger.break()
    logger.error("No config file found in the current working directory.")
    projectSpinner.fail('To start over, please run "init" command first.')
    process.exit(1)
  }
  projectSpinner.succeed()
}
