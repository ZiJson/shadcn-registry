import { RegistryConfig } from "./src/config-schema";

const registryConfig: RegistryConfig = {
  baseUrl: "./src/test",
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
};

export default registryConfig;
