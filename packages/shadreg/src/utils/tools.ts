import path from "path";
import fs from "fs-extra";
import { loadRegistryConfig } from "./loader";
import { RegistryConfig } from "../config-schema";

const configPath = path.resolve(__dirname, "registry.config.ts");

export const loadRegistry = async () => {
  //   const config: RegistryConfig = await import(configPath);
  //   console.log(config.outputDir);
  console.log(configPath);
};
