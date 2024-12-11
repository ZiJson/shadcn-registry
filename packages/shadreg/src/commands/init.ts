import path from "path"
import { Command } from "commander"
import { z } from "zod"
import { preFlightInit } from "../preflights/preflight-init"
import { writeConfig } from "../utils/write-config"

export const initOptionsSchema = z.object({
  cwd: z.string(),
  force: z.boolean(),
})
export type InitOptions = z.infer<typeof initOptionsSchema>

export const init = new Command()
  .name("init")
  .description("Initialize the registry config file -- 'registry.config.ts'")
  .option("--cwd <cwd>", "Current working directory", process.cwd())
  .option("-f, --force", "force overwrite of existing configuration.", false)
  .action(async (opts) => {
    const options = initOptionsSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    })

    // Uncomment these lines if preFlightInit and error handling are needed
    await preFlightInit(options)

    await writeConfig(options.cwd)
  })
