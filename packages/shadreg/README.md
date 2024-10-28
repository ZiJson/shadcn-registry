# shadreg

A CLI for generate shadcn registry json for your UI library.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `registry.config.ts` for config setting in your project root.

```bash
npx shadreg init
```

### Config File Template

``` ts
// registry.config.ts

export default {
  baseUrl: "./src/components", // dir of your components
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
```

if shadreg has installed, you can import the config type from pkg

``` ts
// registry.config.ts
import {type RegistryConfig} from "shadreg"

const config: RegistryConfig =  {
  baseUrl: "./src/components", // dir of your components
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

export default config
```

## build

Use the `build` command to generate registry json files to your project.

```bash
npx shadcn build
```

the `build` command will generate registry json files in `registry/` dir in your project root 


## Documentation

Visit  to view the documentation.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).