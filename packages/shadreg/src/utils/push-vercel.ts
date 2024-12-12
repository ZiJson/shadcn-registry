import { z } from "zod"
import { publishOptionsSchema } from "../commands/publish"
import { put } from "@vercel/blob"
import fs from "fs-extra"
import path from "path"
import { spinner } from "./spinner"
import { highlighter } from "./hightlighter"
import { GeneratedRegistry, RegistryConfig } from "../config-schema"
import { shadregExplorer } from "./cosmiconfig"
import { logger } from "./logger"

export const pushVercel = async (
  options: z.infer<typeof publishOptionsSchema>,
) => {
  const config = (await shadregExplorer.search(options.cwd))!
    .config as RegistryConfig
  const registries: GeneratedRegistry[] = fs.readJsonSync(
    path.resolve(options.cwd, config.outputDir, "./_generated.json"),
  )

  const newGenerated: GeneratedRegistry[] = registries
  for (const registry of registries) {
    const putSpinner = spinner(
      `Pushing ${highlighter.info(registry.name)}`,
    ).start()
    const { url } = await put(
      registry.name + ".json",
      JSON.stringify(registry.entry),
      {
        access: "public",
      },
    )
    putSpinner.succeed()
    newGenerated.find((r) => r.name === registry.name)!.url = url
  }

  logger.break()
  logger.success(`Successfully published ${newGenerated.length} registries.`)
  logger.log(
    `View ${path.resolve(options.cwd, config.outputDir, "./_generated.json")}`,
  )

  return newGenerated
}
