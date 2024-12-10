"use server"
import { put, del } from "@vercel/blob"

const registryTemplate = {
  name: "my-demo",
  type: "registry:ui",
  registryDependencies: ["button"],
  dependencies: [],
  devDependencies: [],
  tailwind: {
    config: {},
  },
  cssVars: {},
  files: ["my-demo.tsx"],
}

const getDemoRegistry = (code: string) => {
  return {
    ...registryTemplate,
    files: [
      {
        path: "ui/my-demo.tsx",
        content: code,
        type: "registry:ui",
      },
    ],
  }
}
export const uploadRegistry = async (code: string) => {
  const { url } = await put(
    "shadregDemo.json",
    JSON.stringify(getDemoRegistry(code)),
    {
      access: "public",
    },
  )
  return url
}

export const deleteRegistry = async (url: string) => {
  await del(url)
}
