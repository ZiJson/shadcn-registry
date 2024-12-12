import { RegistryEntry, registryEntrySchema } from "./schema"
import { z } from "zod"

export const configSchema = z.object({
  baseUrl: z.string(),
  outputDir: z.string(),
  registries: z.array(registryEntrySchema),
})

export type RegistryConfig = z.infer<typeof configSchema>

export const shadregConfig = (config: RegistryConfig) => config

export type GeneratedRegistry = {
  name: string
  url?: string
  entry: RegistryEntry
}

export const configTemplate = `
import { shadregConfig } from "shadreg";

export default shadregConfig({
  baseUrl: "./src/components",
  outputDir: "./shadreg",
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
});
`
