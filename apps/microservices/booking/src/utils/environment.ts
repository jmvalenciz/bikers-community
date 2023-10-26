import { z } from 'zod';

const Environment = z.object({
  BROKER: z.object({
    URL: z.union([z.string().url(), z.string().ip()]),
    PORT: z.string().transform((arg) => Number.parseInt(arg)),
    QUEUE: z.string(),
  }),
  PORT: z.number().min(0).max(65535),
});

export type Environment = z.infer<typeof Environment>;

export const env: Environment = Environment.parse({
  BROKER: {
    URL: process.env.BROKER_URL,
    PORT: process.env.BROKER_PORT,
    QUEUE: 'booking',
  },
  PORT: process.env.PORT,
});
