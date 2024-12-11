import { RegistryConfig } from "@/src/config-schema"
import fs from "fs-extra"
import path from "path"
import { logger } from "./logger"
import { z } from "zod"
import { buildOptionSchema } from "../commands/build"
import { shadregExplorer } from "./cosmiconfig"
import { spinner } from "./spinner"
import { highlighter } from "./hightlighter"

export const generateRegistry = async (
  options: z.infer<typeof buildOptionSchema>,
) => {
  const generateSpinner = spinner(`Generating registry files...`).start()
  const result = await shadregExplorer.search(options.cwd)!
  const config = result?.config as RegistryConfig

  const { registries, baseUrl } = config

  const newRegistries = await Promise.all(
    registries.map(async (registry) => {
      const files = await Promise.all(
        (registry.files || []).map(async (file) => {
          if (typeof file === "string") {
            // Check if the file is a path
            const componentPath = path.join(baseUrl, file)
            let component = ""
            if (!fs.existsSync(componentPath)) {
              logger.break()
              logger.warn(`File ${file} does not exist, skipped.`)
              return file
            } else {
              component = await getComponentByPath(path.join(baseUrl, file))
            }
            return {
              path: file,
              content: component,
              type: registry.type,
            }
          }
          return file
        }),
      )

      return { ...registry, files }
    }),
  )

  const generated = newRegistries.filter((r) =>
    r.files.every((f) => typeof f !== "string"),
  )

  generateSpinner.succeed(
    `Generated ${highlighter.success(generated.length)} registry files.`,
  )

  if (generated.length === 0) {
    process.exit(0)
  }

  return generated
}

const getComponentByPath = async (path: string): Promise<string> => {
  const components = fs.readFileSync(path, "utf-8")

  return components
}
