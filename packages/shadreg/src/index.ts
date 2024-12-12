#!/usr/bin/env node
import { Command } from "commander"
import { build } from "./commands/build"
import { init } from "./commands/init"
import packageJson from "../package.json"
import { publish } from "./commands/publish"
export * from "@/src/config-schema"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()

  program
    .name("shadreg")
    .description("CLI to build Shadcn registry file of your components")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number",
    )

  program.addCommand(init).addCommand(build).addCommand(publish)

  program.parse()
}

main()
