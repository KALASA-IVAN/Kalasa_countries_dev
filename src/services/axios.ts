import { BASE_URL, createExtendedInstance } from '@/src/hooks/axios';

export const BACKEND_BASE_URL = `${BASE_URL}/v3.1`;

export const backendAxios = createExtendedInstance('/v3.1');
