import Suspense from '@/shared/components/fallback/SuspenseContainer';
import AppProvider from './provider';
import AppRouter from './router';

const App = () => {
  return (
    <AppProvider>
      <Suspense>
        <AppRouter />
      </Suspense>
    </AppProvider>
  );
};

export default App;
