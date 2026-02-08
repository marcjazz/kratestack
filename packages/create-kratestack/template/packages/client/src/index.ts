import createClient from 'openapi-fetch';
import type { paths } from './schema';

export const client = createClient<paths>({
  baseUrl: typeof window === 'undefined' ? 'http://127.0.0.1:8080' : '',
});

export type { paths };
