import { useLocation } from 'react-router-dom';
import { Role } from '../types/types';

const useGetRole = () => {
  const { pathname } = useLocation();
  const currentPathname = pathname.split('/')[1];
  const role = currentPathname === 'seller' ? Role.seller : Role.customer;
  return role;
};

export default useGetRole;
