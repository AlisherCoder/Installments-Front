import { api } from '@/shared/lib/axios';
import type { LoginI } from '@/shared/types/auth';

export const login = (body: LoginI) =>
  api.post('/auth/login', body).then((res) => res.data);
