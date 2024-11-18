import { z } from "zod";
import { publishOptionsSchema } from "../commands/publish";
import { put } from "@vercel/blob";
import fs from "fs-extra";
import path from "path";
import { spinner } from "./spinner";
import { highlighter } from "./hightlighter";
import dotenv from "dotenv";
import { RegistryConfig } from "../config-schema";
dotenv.config();

export const pushVercel = async (
  options: z.infer<typeof publishOptionsSchema>,
  config: RegistryConfig
) => {
  const registries = fs.readdirSync(
    path.resolve(options.cwd, config.outputDir)
  );

  const urls: { name: string; url: string }[] = [];
  for (const registry of registries) {
    if (registry === "_published.json") continue;
    const url = await readAndPush(
      path.join(options.cwd, config.outputDir),
      registry
    );
    urls.push({ name: registry.split(".")[0], url });
  }

  return urls;
};

const readAndPush = async (cwd: string, filePath: string) => {
  const file = fs.readFileSync(path.join(cwd, filePath));
  const Spinner = spinner(`Pushing ${highlighter.info(filePath)}`).start();

  try {
    const { url } = await put(filePath, file, {
      access: "public",
    });
    Spinner.succeed(`Successfully pushed ${highlighter.success(filePath)}`);
    return url;
  } catch (error) {
    Spinner.fail(`Failed to push ${highlighter.error(filePath)}`);
    throw error;
  }
};
