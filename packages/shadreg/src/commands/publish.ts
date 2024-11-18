import path from "path";
import { Command } from "commander";
import { z } from "zod";
import { errorHandler } from "@/src/utils/errors";
import { preFlightPublish } from "../preflights/preflight-publish";
import { pushVercel } from "../utils/push-vercel";
import fs from "fs-extra";

export const publishOptionsSchema = z.object({
  cwd: z.string(),
  force: z.boolean(),
});
export type PublishOptions = z.infer<typeof publishOptionsSchema>;

export const publish = new Command()
  .name("publish")
  .description("Publish your built registries json file to Vercel Blob Store")
  .option("--cwd <cwd>", "Current working directory", process.cwd())
  .option("-f, --force", "force overwrite of existing configuration.", false)
  .action(async (opts) => {
    const options = publishOptionsSchema.parse({
      cwd: path.resolve(opts.cwd),
      ...opts,
    });

    // Uncomment these lines if preFlightInit and error handling are needed
    const { errors: preflightErrors } = await preFlightPublish(options);
    if (Object.values(preflightErrors).some((e) => e)) {
      errorHandler(preflightErrors);
      process.exit(1);
    }

    const urls = await pushVercel(options);

    fs.writeFileSync(
      path.join(options.cwd, "registry_published.json"),
      JSON.stringify(urls, null, 2)
    );
  });