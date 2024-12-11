import path from "path"
import { Command } from "commander"
import { z } from "zod"
import { preflightBuild } from "@/src/preflights/preflight-build"
import { loadRegistryConfig } from "@/src/utils/loader"
import { generateRegistry } from "../utils/generate-registry"
import { writeRegistry } from "../utils/write-registry"
import { errorHandler } from "../utils/errors"

export const buildOptionSchema = z.object({
  cwd: z.string(),
})

export type BuildOptions = z.infer<typeof buildOptionSchema>

export const build = new Command()
  .name("build")
  .description("build the registry files for your components")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd(),
  )
  .action(async (_, opts) => {
    const options = buildOptionSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    })

    await preflightBuild(options)

    const generated = await generateRegistry(options)

    await writeRegistry(generated, options)
  })
