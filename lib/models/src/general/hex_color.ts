import { z } from 'zod';

export const HexColor = z.string().regex(/^#[0-9a-f]{3,6}$/i);
