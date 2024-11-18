import { shadregConfig } from "shadreg";

export default shadregConfig({
  baseUrl: "./src/test",
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
});
