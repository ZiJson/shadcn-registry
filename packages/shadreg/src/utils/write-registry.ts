import path from "path"
import fs from "fs-extra"
import { BuildOptions } from "../commands/build"
import { Registry } from "../schema"
import { highlighter } from "./hightlighter"
import { spinner } from "./spinner"
import { RegistryConfig } from "../config-schema"
import { shadregExplorer } from "./cosmiconfig"
import { logger } from "./logger"

export const writeRegistry = async (
  registries: Registry,
  opts: BuildOptions,
) => {
  const result = await shadregExplorer.search(opts.cwd)!
  const { outputDir } = result?.config as RegistryConfig

  const distPath = path.join(opts.cwd, outputDir)
  fs.ensureDirSync(distPath)

  for (const registry of registries) {
    const Spinner = spinner(`Writing ${highlighter.info(registry.name)}...`)
    Spinner.suffixText
    try {
      const registryPath = path.join(distPath, `${registry.name}.json`)
      await fs.writeJSON(registryPath, registry, { spaces: 2 })
      Spinner.succeed(`${highlighter.success(registry.name)}`)
    } catch (error) {
      Spinner.fail(`Failed to write ${highlighter.error(registry.name)}`)
      throw error
    }
  }

  const Spinner = spinner(`Processing ...`).start()
  await fs.writeJSON(path.join(distPath, "./_generated.json"), registries, {
    spaces: 2,
  })
  Spinner.succeed(
    `Generated ${highlighter.success(registries.length)} json files`,
  )

  logger.break()
  logger.log(`View ${distPath}`)
}
