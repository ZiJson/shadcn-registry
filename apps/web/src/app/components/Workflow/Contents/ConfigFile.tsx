import CodeBlock from "@/components/CodeBlock"

const ConfigFile = () => {
  return <CodeBlock lang="ts" code={code} />
}

export default ConfigFile

const code = `import { shadregConfig } from "shadreg"

export default shadregConfig({
  baseUrl: "./src/components",
  outputDir: "./shadreg",
  registries: [
    {
      name: "cool-text",
      type: "registry:ui",
      registryDependencies: ["button"],
      dependencies: [],
      devDependencies: [],
      tailwind: {
        config: {},
      },
      cssVars: {},
      files: ["cool-text.tsx"],
    },
  ],
})`
