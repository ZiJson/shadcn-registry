import path from "path"
import { Command } from "commander"
import { z } from "zod"
import { preFlightInit } from "../preflights/preflight-init"
import { errorHandler } from "@/src/utils/errors"
import fs from "fs-extra"
import { configTemplate } from "../config-schema"

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
    const { errors: preflightErrors } = await preFlightInit(options)
    if (Object.values(preflightErrors).some((e) => e)) {
      errorHandler(preflightErrors)
      process.exit(1)
    }

    fs.writeFileSync(
      path.join(options.cwd, "registry.config.ts"),
      configTemplate,
    )
  })
