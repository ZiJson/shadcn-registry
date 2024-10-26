#!/usr/bin/env node
import { Command } from "commander";
import { build } from "./commands/build";
import packageJson from "../package.json";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command();

  program
    .name("shadcn-registry")
    .description("CLI to build Shadcn registry file of your componenets")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );

  program.addCommand(build);

  program.parse();
}

main();
