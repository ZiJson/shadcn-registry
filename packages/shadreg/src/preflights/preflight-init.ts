import path from "path";
import { initOptionsSchema } from "@/src/commands/init";
import { ERRORS } from "@/src/utils/errors";
import { highlighter } from "@/src/utils/hightlighter";
import { logger } from "@/src/utils/logger";
import { spinner } from "@/src/utils/spinner";
import fs from "fs-extra";
import { z } from "zod";

export async function preFlightInit(
  options: z.infer<typeof initOptionsSchema>
) {
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
      projectInfo: null,
    };
  }

  if (fs.existsSync(path.resolve(options.cwd, "registry.config.ts"))) {
    projectSpinner?.fail();
    logger.break();
    logger.error(
      `A ${highlighter.info(
        "registry.config.ts"
      )} file already exists at ${highlighter.info(
        options.cwd
      )}.\nTo start over, remove the ${highlighter.info(
        "registry.config.ts"
      )} file and run ${highlighter.info("init")} again.`
    );
    logger.break();
    process.exit(1);
  }

  projectSpinner?.succeed();

  return {
    errors,
  };
}
