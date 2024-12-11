import { logger } from "./logger"

export enum ERRORS {
  MISSING_CONFIG_FILE = 'Cannot find "registry.config.ts" in the current working directory.',
  INVALID_REGISTRY_FILE = 'Invalid "registry.ts" file.',
  MISSING_DIR_OR_EMPTY_PROJECT = "Cannot find a package.json in the current working directory.",
}

export const errorHandler = (error: ERRORS) => {
  logger.break()
  logger.error(error)
  process.exit(1)
}
