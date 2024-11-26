import path from "path"
import fs from "fs-extra"
import { BuildOptions } from "../commands/build"
import { Registry } from "../schema"
import { highlighter } from "./hightlighter"
import { spinner } from "./spinner"
import { RegistryConfig } from "../config-schema"

export const writeRegistry = async (
  registries: Registry,
  opts: BuildOptions,
  config: RegistryConfig,
) => {
  const { outputDir } = config
  const distPath = path.join(opts.cwd, outputDir)
  fs.ensureDirSync(distPath)

  for (const registry of registries) {
    const Spinner = spinner(`Writing ${highlighter.info(registry.name)}`)

    try {
      const registryPath = path.join(distPath, `${registry.name}.json`)
      await fs.writeJSON(registryPath, registry, { spaces: 2 })
      Spinner.succeed(
        `Successfully wrote ${highlighter.success(registry.name)}`,
      )
    } catch (error) {
      Spinner.fail(`Failed to write ${highlighter.error(registry.name)}`)
      throw error
    }
  }
}
