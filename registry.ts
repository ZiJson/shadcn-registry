import { RegistryEntry } from "./src/schema";

const config = {
  baseUrl: "./src/test",
};

const registry: RegistryEntry[] = [
  {
    name: "cool-text",
    type: "registry:ui",

    // shadcn-ui components that this component depends on
    registryDependencies: ["button"],

    // npm dependencies that this component depends on
    dependencies: [],
    devDependencies: [],

    // Tailwind CSS config
    tailwind: {
      config: {},
    },

    // CSS variables
    cssVars: {},

    // Files that make up this component in your src/components/ui folder
    files: ["cool-text.tsx"],
  },
];

export default { registry, config };
