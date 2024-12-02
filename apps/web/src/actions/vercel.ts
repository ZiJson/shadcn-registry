"use server"
import { put, del } from "@vercel/blob"

export const uploadRegistry = async (registry: string) => {
  const { url } = await put("shadregDemo.json", registry, {
    access: "public",
  })
  return url
}

export const deleteRegistry = async (url: string) => {
  await del(url)
}
