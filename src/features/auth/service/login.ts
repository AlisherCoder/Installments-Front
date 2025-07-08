import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginI } from '@/shared/types/types';
import { api } from '@/shared/lib/axios';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const key = 'auth';

  const getMe = () =>
    useQuery({
      queryKey: [key],
      queryFn: () => api.get('auth/me').then((res) => res.data),
    });

  const login = useMutation({
    mutationFn: (body: LoginI) =>
      api.post('auth/login', body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return { login, getMe };
};
