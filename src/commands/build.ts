import path from "path";
import { Command } from "commander";
import { z } from "zod";
import { preflightBuild } from "@/src/preflights/preflight-build";
import { logger } from "@/src/utils/logger";
import { getRegistry } from "@/src/utils/get-registry";

export const buildOptionSchema = z.object({
  cwd: z.string(),
});

export const build = new Command()
  .name("build")
  .description("build the registry files for your components")
  .argument(
    "[components...]",
    "the components to add or a url to the component."
  )
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-s, --silent", "mute output.", false)
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .action(async (components, opts) => {
    const options = buildOptionSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    });

    const { errors } = await preflightBuild(options);

    if (Object.keys(errors).length > 0) {
      logger.error(errors);
      process.exit(1);
    }

    const registry = await getRegistry(options);
    console.log(registry);
  });
