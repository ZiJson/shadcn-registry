import path from "path"
import { Command } from "commander"
import { z } from "zod"
import { preFlightPublish } from "../preflights/preflight-publish"
import { pushVercel } from "../utils/push-vercel"
import fs from "fs-extra"
import { shadregExplorer } from "../utils/cosmiconfig"
import { RegistryConfig } from "../config-schema"
import dotenv from "dotenv"

dotenv.config()

export const publishOptionsSchema = z.object({
  cwd: z.string(),
  token: z.string(),
})
export type PublishOptions = z.infer<typeof publishOptionsSchema>

export const publish = new Command()
  .name("publish")
  .description("Publish your built registries json file to Vercel Blob Store")
  .option("--cwd <cwd>", "Current working directory", process.cwd())
  .option(
    "--token <token>",
    "Vercel Blob token",
    process.env.BLOB_READ_WRITE_TOKEN,
  )
  .action(async (opts) => {
    const options = publishOptionsSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    })
    process.env.BLOB_READ_WRITE_TOKEN = options.token

    await preFlightPublish(options)

    const generatedRegistry = await pushVercel(options)

    const config = (await shadregExplorer.search(options.cwd))!
      .config as RegistryConfig

    fs.writeJsonSync(
      path.join(options.cwd, config.outputDir, "_generated.json"),
      generatedRegistry,
      { spaces: 2 },
    )
  })
