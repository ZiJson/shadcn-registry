import { logger } from "./logger";

export enum Errors {
  MISSING_REGISTRY_FILE = 'Cannot find "registry.ts" in the current working directory.',
  INVALID_REGISTRY_FILE = 'Invalid "registry.ts" file.',
}

export const errorHandler = (errors: Record<string, boolean>) => {
  for (const error in errors) {
    if (errors[error]) {
      logger.error(error);
    }
  }
};
