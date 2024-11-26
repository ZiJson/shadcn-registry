import path from 'path'
import { Command } from 'commander'
import { z } from 'zod'
import { preflightBuild } from '@/src/preflights/preflight-build'
import { loadRegistryConfig } from '@/src/utils/loader'
import { generateRegistry } from '../utils/generate-registry'
import { writeRegistry } from '../utils/write-registry'
import { errorHandler } from '../utils/errors'

export const buildOptionSchema = z.object({
  cwd: z.string(),
})

export type BuildOptions = z.infer<typeof buildOptionSchema>

export const build = new Command()
  .name('build')
  .description('build the registry files for your components')
  .argument(
    '[components...]',
    'the components to add or a url to the component.',
  )
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .option('-s, --silent', 'mute output.', false)
  .option(
    '--src-dir',
    'use the src directory when creating a new project.',
    false,
  )
  .action(async (_, opts) => {
    const options = buildOptionSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    })

    let { errors: preflightErrors } = await preflightBuild(options)

    if (Object.values(preflightErrors).some((e) => e)) {
      errorHandler(preflightErrors)
      process.exit(1)
    }
    // TODO: error handling
    const { config, errors: getRegistryErrors } =
      await loadRegistryConfig(options)

    if (!config || Object.values(getRegistryErrors).some((e) => e)) {
      errorHandler(getRegistryErrors)
      process.exit(1)
    }

    const newRegistries = await generateRegistry({
      ...config,
      baseUrl: path.resolve(options.cwd, config.baseUrl),
    })

    await writeRegistry(newRegistries, opts, config)
  })
