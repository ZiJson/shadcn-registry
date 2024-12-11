import { cosmiconfig } from "cosmiconfig"

// explorer for shadreg config
export const shadregExplorer = cosmiconfig("shadreg")

// explorer for tsconfig
export const tsconfigExplorer = cosmiconfig("tsconfig", {
  searchPlaces: ["tsconfig.json"], // Make sure it's only looking for tsconfig.json
})
