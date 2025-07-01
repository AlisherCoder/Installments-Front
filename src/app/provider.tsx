import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { type ReactNode } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppProvider;
