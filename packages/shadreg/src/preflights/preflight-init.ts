import path from "path"
import { initOptionsSchema } from "@/src/commands/init"
import { errorHandler, ERRORS } from "@/src/utils/errors"
import { highlighter } from "@/src/utils/hightlighter"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import fs from "fs-extra"
import { z } from "zod"
import { shadregExplorer } from "../utils/cosmiconfig"
import inquirer from "inquirer"

export async function preFlightInit(
  options: z.infer<typeof initOptionsSchema>,
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

  // Check if config file already exists
  const configFile = await shadregExplorer
    .search(options.cwd)
    .then((result) => result?.filepath.split("/").pop())

  projectSpinner.succeed()

  if (configFile) {
    if (options.force) {
      logger.log(
        `A ${highlighter.info(configFile)} file already exists. Overwriting...`,
      )
      fs.removeSync(path.resolve(options.cwd, "registry.config.ts"))
    } else {
      // projectSpinner.stopAndPersist()
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "force",
          message: `A ${highlighter.info(configFile)} file already exists. Overwrite it?`,
        },
      ])
      if (!answers.force) {
        projectSpinner.fail("you can overwrite or modify it manually.")

        process.exit(1)
      }
    }
  }
}
