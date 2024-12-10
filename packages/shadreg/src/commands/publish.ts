import path from "path"
import { Command } from "commander"
import { z } from "zod"
import { errorHandler } from "@/src/utils/errors"
import { preFlightPublish } from "../preflights/preflight-publish"
import { pushVercel } from "../utils/push-vercel"
import fs from "fs-extra"
import { loadRegistryConfig } from "../utils/loader"

export const publishOptionsSchema = z.object({
  cwd: z.string(),
  force: z.boolean(),
  outputDir: z.string(),
})
export type PublishOptions = z.infer<typeof publishOptionsSchema>

export const publish = new Command()
  .name("publish")
  .description("Publish your built registries json file to Vercel Blob Store")
  .option("--cwd <cwd>", "Current working directory", process.cwd())
  .option("-f, --force", "force overwrite of existing configuration.", false)
  .option(
    "-o, --outputDir <outputDir>",
    "Output directory for built registry files",
    "shadreg",
  )
  .action(async (opts) => {
    const options = publishOptionsSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    })

    // Uncomment these lines if preFlightInit and error handling are needed
    const { errors: preflightErrors } = await preFlightPublish(options)
    if (Object.values(preflightErrors).some((e) => e)) {
      errorHandler(preflightErrors)
      process.exit(1)
    }

    const { config, errors: getRegistryErrors } =
      await loadRegistryConfig(options)

    if (!config) return

    const generatedRegistry = await pushVercel(options, config)

    fs.writeFileSync(
      path.join(options.cwd, config.outputDir, "_published.json"),
      JSON.stringify(generatedRegistry, null, 2),
    )
    fs.writeFileSync(
      path.join(options.cwd, config.outputDir, "index.mjs"),
      IndexMjs,
    )
    fs.writeFileSync(
      path.join(options.cwd, config.outputDir, "index.d.ts"),
      IndexDts,
    )
  })

const IndexMjs = `import published from "./_published.json" assert { type: "json" }

export const allRegistries = [...published]
`

const IndexDts = `type GeneratedRegistry = {
  name: string
  url: string
  registryEntry: string
}

export declare const allRegistries: GeneratedRegistry[]
`
