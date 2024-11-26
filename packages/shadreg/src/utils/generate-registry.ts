import { RegistryConfig } from "@/src/config-schema"
import fs from "fs-extra"
import path from "path"
import { logger } from "./logger"

export const generateRegistry = async (config: RegistryConfig) => {
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
              logger.error(`File ${file} does not exist, skipping.`)
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

  return newRegistries.filter((r) =>
    r.files.every((f) => typeof f !== "string"),
  )
}

const getComponentByPath = async (path: string): Promise<string> => {
  const components = fs.readFileSync(path, "utf-8")

  return components
}
