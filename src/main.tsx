import '@ant-design/v5-patch-for-react-19';
import '@/shared/static/methods.ts';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
