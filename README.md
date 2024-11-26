# shadreg

A CLI for generate shadcn registry json for your UI library.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `registry.config.ts` for config setting in your project root.

```bash
npx shadreg init
```

### Config File Template

```ts
// registry.config.ts

import { shadregConfig } from "shadreg"

export default shadregConfig({
  baseUrl: "./src/components",
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
})
```

## build

Use the `build` command to generate registry json files to your project.

```bash
npx shadcn build
```

the `build` command will generate registry json files in `registry/` dir in your project root

## publish

Use the `publish` command to make your registry json files publicly accessible.

```bash
npx shadcn publish
```

you must provide a [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) token in your `.env` file.

```bash
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## Documentation

Visit to view the documentation.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
