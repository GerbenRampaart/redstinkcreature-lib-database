import { z } from 'zod';

export const databaseEnvSchema = z.object({
	POSTGRES_URL: z.string().optional(),
	MONGO_URL: z.string().optional(),
});

export type DatabaseEnvSchemaType = z.infer<typeof databaseEnvSchema>;
