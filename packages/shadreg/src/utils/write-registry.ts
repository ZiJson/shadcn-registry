import path from "path"
import fs from "fs-extra"
import { BuildOptions } from "../commands/build"
import { Registry, RegistryEntry } from "../schema"
import { highlighter } from "./hightlighter"
import { spinner } from "./spinner"
import { GeneratedRegistry, RegistryConfig } from "../config-schema"
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

  const generated: GeneratedRegistry[] = registries.map((registry) => ({
    name: registry.name,
    entry: registry,
  }))

  const Spinner = spinner(`Processing ...`).start()
  await fs.writeJSON(path.join(distPath, "./_generated.json"), generated, {
    spaces: 2,
  })

  fs.writeFileSync(path.join(opts.cwd, outputDir, "index.mjs"), IndexMjs)
  fs.writeFileSync(path.join(opts.cwd, outputDir, "index.d.ts"), IndexDts)

  Spinner.succeed(
    `Generated ${highlighter.success(registries.length)} json files`,
  )

  logger.break()
  logger.log(`View ${distPath}`)
}

const IndexMjs = `import generated from "./_generated.json" assert { type: "json" }

export const allRegistries = [...generated]
`

const IndexDts = `import { type GeneratedRegistry } from "shadreg"

export declare const allRegistries: GeneratedRegistry[]`
