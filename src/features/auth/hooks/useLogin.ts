import { useMutation } from '@tanstack/react-query';
import * as Auth from '../service/login';

export const useLogin = () => {
  const login = useMutation({
    mutationFn: Auth.login,
  });

  return { login };
};
