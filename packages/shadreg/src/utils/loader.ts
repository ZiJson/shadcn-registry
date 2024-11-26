import path from 'path'
import { z } from 'zod'
import { buildOptionSchema } from '@/src/commands/build'
import { logger } from '@/src/utils/logger'
import { ERRORS } from '@/src/utils/errors'
import { configSchema } from '../config-schema'
import { bundleRequire } from 'bundle-require'

export const loadRegistryConfig = async (
  options: z.infer<typeof buildOptionSchema>,
): Promise<{
  config: z.infer<typeof configSchema> | null
  errors: Record<string, boolean>
}> => {
  // TODO: complie registry.ts in temp folder
  try {
    const errors: Record<string, boolean> = {}

    const config = await bundleRequire({
      filepath: path.join(options.cwd, 'registry.config.ts'),
    }).then((config) => config.mod.default || config.mod)

    // Validate with Zod
    const parseResult = configSchema.safeParse(config)
    if (!parseResult.success) {
      logger.error('Invalid registry config:', parseResult.error)
      errors[ERRORS.INVALID_REGISTRY_FILE] = true
      return { config: null, errors }
    }

    return { config, errors }
  } catch (error) {
    logger.error('Failed to load registry config:', error)
    return { config: null, errors: { [ERRORS.INVALID_REGISTRY_FILE]: true } }
  } finally {
  }
}
