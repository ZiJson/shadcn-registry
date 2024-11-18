import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import { buildOptionSchema } from "../commands/build";
import { logger } from "@/src/utils/logger";
import { ERRORS } from "@/src/utils/errors";
import { spinner } from "../utils/spinner";

export const preflightBuild = async (
  options: z.infer<typeof buildOptionSchema>
) => {
  const errors: Record<string, boolean> = {};
  const projectSpinner = spinner(`Preflight checks.`).start();

  // Ensure target directory exists.
  // Check for empty project. We assume if no package.json exists, the project is empty.
  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.resolve(options.cwd, "package.json"))
  ) {
    projectSpinner?.fail();
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true;
    return {
      errors,
    };
  }

  // Check if 'registry.config.ts' exists
  if (!fs.existsSync(path.join(options.cwd, "registry.config.ts"))) {
    projectSpinner?.fail();
    logger.error(
      "No 'registry.config.ts' found in the current working directory."
    );
    errors[ERRORS.MISSING_CONFIG_FILE] = true;
    return { errors };
  }
  projectSpinner?.succeed();

  return { errors };
};
