import path from "path";
import { z } from "zod";
import { buildOptionSchema } from "@/src/commands/build";
import fs from "fs-extra";
import { registryEntrySchema } from "@/src/schema";
import { logger } from "@/src/utils/logger";
import { build } from "tsup";

const configSchema = z.object({
  baseUrl: z.string(),
  registry: z.array(registryEntrySchema),
});

export const getRegistry = async (
  options: z.infer<typeof buildOptionSchema>
): Promise<any | null> => {
  const configPath = path.join(options.cwd, "registry.config.json");

  //   await build({
  //     clean: true,
  //     dts: true,
  //     entry: [path.join(options.cwd, "registry.ts")],
  //     format: ["esm"],
  //     sourcemap: true,
  //     minify: true,
  //     target: "esnext",
  //     outDir: "distt",
  //   });

  //   const config = await fs.readJSONSync(configPath);
  const config = await import(path.join(options.cwd, "/ddist/registry.js"));
  console.log(config.default);

  if (!configSchema.safeParse(config).success) {
    logger.error("Invalid registry config file.");
    return null;
  }

  return config;
};
