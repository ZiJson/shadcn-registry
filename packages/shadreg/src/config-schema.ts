import { registryEntrySchema } from "./schema";
import { z } from "zod";

export const configSchema = z.object({
  baseUrl: z.string(),
  registries: z.array(registryEntrySchema),
});

export type RegistryConfig = z.infer<typeof configSchema>;
