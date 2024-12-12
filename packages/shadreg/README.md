# `shadreg`

A CLI tool for generating a ShadCN component registry JSON for your UI library.

## Commands

### `init`

The `init` command initializes the necessary dependencies for your project and generates a configuration file.

```bash
npx shadreg init
```

You will be prompted with a series of questions to configure your project.

Example interaction:

```bash
✔ A shadreg.config.ts file already exists. Overwrite it? Yes
✔ Enter the output directory: ./shadreg
✔ Enter the base url of your components: ./src/components
✔ Do you want to include registry example? Yes
```

### Config File Template

```ts
// shadreg.config.ts

import { shadregConfig } from "shadreg"

export default shadregConfig({
  baseUrl: "./src/components", // Path to your component files
  outputDir: "./shadreg", // Output directory for the registry files
  registries: [
    {
      name: "cool-text", // Component name
      type: "registry:ui", // Type of registry (e.g., UI component)
      registryDependencies: ["button"], // Components your component depends on
      dependencies: [], // Regular dependencies
      devDependencies: [], // Dev dependencies
      tailwind: {
        config: {}, // Tailwind config if necessary
      },
      cssVars: {}, // CSS variables for your component
      files: ["cool-text.tsx"], // Files associated with the component
    },
  ],
})

// your "cool-text" component should located at ./src/components/cool-text.tsx
```

### Properties

| Property   | Type       | Description                                                                                                                                                 | Default            |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| baseUrl    | `string`   | The base url of your components                                                                                                                             | `./src/components` |
| outputDir  | `string`   | Where the registry json files and `_generated.json` will be saved                                                                                           | `./shadreg`        |
| registries | `Registry` | A list of registry entries. See [Shadcn Registry Schema](https://github.com/shadcn-ui/ui/blob/shadcn%402.0.0/apps/www/registry/schema.ts) for more details. |                    |

## `build`

The `build` command generates the registry JSON files in the specified output directory.

```bash
npx shadcn build
```

This will generate the registry JSON files and a `_generated.json` in the `outputDir` you set.

### `_generated.json` Structure

| Property | Type            | Description                                                                                                                                                           |
| -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`        | The name of the component                                                                                                                                             |
| url      | `string?`       | The url of the component after publishing to Vercel Blob Store.                                                                                                       |
| entry    | `RegistryEntry` | The registry entry for the component. See [Shadcn Registry Schema](https://github.com/shadcn-ui/ui/blob/shadcn%402.0.0/apps/www/registry/schema.ts) for more details. |

A `allRegistries` object is exported from `index.mjs` and `index.d.ts` files, which can be imported into your Next.js project, used in API endpoints, etc.

So that you can make your component public with API endpoint and Shadcn CLI.

### Example for Next.js Integration

1. Update path alias in `tsconfig.json` or `jsconfig.json` :

```json
"paths": {
  "@/*": ["./src/*"],
  "@/shadreg": ["./shadreg/index.mjs"] // <-- add this line
}
```

2. Create an API route in `src/app/api/registry/[name]/route.ts` :

```ts
// src/app/api/registry/[name]/route.ts

import { NextResponse } from "next/server"
import { allRegistries } from "@/shadreg"

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params
  const registry = allRegistries.find((entry) => entry.name === name)

  if (!registry) {
    return NextResponse.json(
      { error: `Registry with name "${name}" not found` },
      { status: 404 },
    )
  }

  return NextResponse.json(registry.entry)
}
```

To fetch the registry:

```bash
GET http://localhost:3000/api/registry/cool-text
```

To add the registry with `shadcn`:

```bash
npx shadcn@latest add http://localhost:3000/api/registry/cool-text
```

## `publish`

The `publish` command uploads the registry JSON to Vercel Blob Store, making it publicly accessible.

```bash
npx shadcn publish
```

You must provide a [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) token in your `.env` file.

```bash
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

Once published, the Vercel Blob URL will be added to the `_generated.json` file.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
