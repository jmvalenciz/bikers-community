/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";

const Environment = z.object({
  BROKER: z.object({
    URL: z.union([z.string().url(), z.string().ip()]),
    PORT: z.number().min(0).max(65535),
    QUEUE: z.string(),
  }),
  PORT: z.number().min(0).max(65535)
});

export type Environment = z.infer<typeof Environment>;

export const env: Environment = {
  BROKER: {
    URL: process.env.BROKER_URL!,
    PORT: process.env.BROKER_PORT!,
    QUEUE: 'booking'
  },
  PORT: process.env.PORT,

};
