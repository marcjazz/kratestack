import createClient from 'openapi-fetch';
import type { paths } from './schema';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return 'http://127.0.0.1:8080';
};

export const client = createClient<paths>({
  baseUrl: getBaseUrl(),
});

export type { paths };
