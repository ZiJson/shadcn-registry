import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import { buildOptionSchema } from "../commands/build";
import { logger } from "@/src/utils/logger";
import { Errors } from "@/src/utils/errors";

export const preflightBuild = async (
  options: z.infer<typeof buildOptionSchema>
) => {
  const errors: Record<number, boolean> = {};

  // Check if 'registry.config.json' exists
  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.join(options.cwd, "registry.config.json"))
  ) {
    logger.error(
      "No 'registry.config.json' found in the current working directory."
    );
    errors[Errors.MISSING_REGISTRY_FILE] = true;
    return { errors };
  }

  return { errors };
};
