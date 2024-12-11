import fs from "fs-extra"
import inquirer from "inquirer"
import { spinner } from "./spinner"
import { tsconfigExplorer } from "./cosmiconfig"
import { logger } from "./logger"

type AnswerType = {
  outputDir: string
  baseUrl: string
  example: boolean
}

export const writeConfig = async (cwd: string) => {
  const answers: AnswerType = await inquirer.prompt([
    {
      type: "input",
      name: "outputDir",
      message: "Enter the output directory:",
      default: "./shadreg",
      validate: (value) => {
        if (value.length === 0) {
          return "outputDir is required"
        }
        return true
      },
    },
    {
      type: "input",
      name: "baseUrl",
      message: "Enter the base url of your components:",
      default: "./src/components",
      validate: (value) => {
        if (value.length === 0) {
          return "baseUrl is required"
        }
        return true
      },
    },
    {
      type: "confirm",
      name: "example",
      message: "Do you want to include registry example?",
      default: true,
    },
  ])

  // check if user using typescript
  const configFile = await tsconfigExplorer
    .search()
    .then((result) => `${cwd}/shadreg.config.${!!result ? "ts" : "js"}`)

  logger.break()
  const writingSpinner = spinner(`Writing config file.`).start()

  try {
    fs.writeFileSync(configFile, configTemplate(answers))
    writingSpinner.succeed("Config file created successfully!")
  } catch (error) {
    writingSpinner.fail()
    throw error
  }
}

const configTemplate = (
  answer: AnswerType,
) => `import { shadregConfig } from "shadreg";

export default shadregConfig({
  baseUrl: "${answer.baseUrl}",
  outputDir: "${answer.outputDir}",
  ${
    answer.example
      ? `registries: [
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
  ],`
      : "registries: [],"
  }
});
`
