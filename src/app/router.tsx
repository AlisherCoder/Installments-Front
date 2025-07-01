import { useRoutes } from 'react-router-dom';
import Suspense from '@/shared/components/fallback/SuspenseContainer';
import { lazy } from 'react';
import ProtectRoute from '@/shared/components/router/ProtectRoute';
import GuestRoute from '@/shared/components/router/GuestRoute';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const MainLayout = lazy(() => import('@/layout/MainLayout'));
const Partner = lazy(() => import('@/features/partner/pages/Partner'));
const Login = lazy(() => import('@/features/auth/pages/Login'));

const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense>
          <ProtectRoute isAuth={isAuth}>
            <MainLayout />
          </ProtectRoute>
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: (
            <Suspense>
              <Partner role="customer" />
            </Suspense>
          ),
        },
        {
          path: '/seller',
          element: (
            <Suspense>
              <Partner role="seller" />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <Suspense>
          <GuestRoute isAuth={isAuth}>
            <Login />
          </GuestRoute>
        </Suspense>
      ),
    },
  ]);
};
export default AppRouter;
