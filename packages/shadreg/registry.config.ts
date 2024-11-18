export default {
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
    {
      name: "iphone-15-pro",
      type: "registry:ui",
      files: ["iphone-15-pro.tsx"],
    },
  ],
};
