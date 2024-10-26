import path from "path";
import { BuildOptions } from "../commands/build";
import { Registry } from "../schema";
import fs from "fs-extra";

export const WriteRegistry = async (
  registries: Registry,
  opts: BuildOptions
) => {
  const distPath = path.join(opts.cwd, "registry");
  fs.ensureDirSync(distPath);

  for (const registry of registries) {
    const registryPath = path.join(distPath, `${registry.name}.json`);
    console.log(`Writing ${registryPath}`);
    await fs.writeJSON(registryPath, registry, { spaces: 2 });
  }
};
