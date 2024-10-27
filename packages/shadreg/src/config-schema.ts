import { registryEntrySchema } from "./schema";
import { z } from "zod";

export const configSchema = z.object({
  baseUrl: z.string(),
  registries: z.array(registryEntrySchema),
});

export type RegistryConfig = z.infer<typeof configSchema>;

export const configTemplate = `
export default {
  baseUrl: "./src/components",
  registries: [
    {
      name: "cool-text",
      type: "registry:ui",
      registryDependencies: ["button"],
      dependencies: [],
      devDependencies: [],
      tailwind: {
        config: {},
      },
      cssVars: {},
      files: ["cool-text.tsx"],
    },
  ],
};`;
