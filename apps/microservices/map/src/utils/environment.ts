import { z } from 'zod';

const PortValidator = z
  .string()
  .transform((port) => Number.parseInt(port))
  .refine((port) => port >= 0 && port <= 65535);

const Environment = z.object({
  DB: z.object({
    HOST: z.string(),
    PORT: PortValidator,
    USER: z.string(),
    PASSWORD: z.string(),
  }),
  PORT: PortValidator,
  NODE_ENV: z.enum(['production', 'development']),
});

export type Environment = z.infer<typeof Environment>;

export const env: Environment = Environment.parse({
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
});
