import path from "path";
import { z } from "zod";
import { buildOptionSchema } from "@/src/commands/build";
import fs from "fs-extra";
import { logger } from "@/src/utils/logger";
import { execSync } from "child_process";
import { Errors } from "@/src/utils/errors";
import { configSchema } from "../config-schema";

export const getRegistry = async (
  options: z.infer<typeof buildOptionSchema>
): Promise<{
  config: z.infer<typeof configSchema> | null;
  errors: Record<string, boolean>;
}> => {
  // TODO: complie registry.ts in temp folder
  try {
    const errors: Record<string, boolean> = {};
    execSync(`npx tsup registry.ts -d temp --clean --format esm `);
    // Import the compiled file from "temp" folder
    const { default: config } = await import(
      fs.existsSync(path.join(options.cwd, "temp/registry.mjs"))
        ? path.join(options.cwd, "temp/registry.mjs")
        : path.join(options.cwd, "temp/registry.js")
    );

    console.log("config", config.default);
    // Validate with Zod
    const parseResult = configSchema.safeParse(config);
    if (!parseResult.success) {
      logger.error("Invalid registry config:", parseResult.error);
      errors[Errors.INVALID_REGISTRY_FILE] = true;
      return { config: null, errors };
    }

    return { config, errors };
  } catch (error) {
    logger.error("Failed to load registry config:", error);
    return { config: null, errors: { [Errors.INVALID_REGISTRY_FILE]: true } };
  } finally {
    fs.remove(path.join(options.cwd, "temp"));
  }
};
