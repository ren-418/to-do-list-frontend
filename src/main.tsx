import ReactDOM from 'react-dom/client';
import App from './app';
import './css/style.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GlobalContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GlobalContextProvider>
    <App />
    <ToastContainer />
  </GlobalContextProvider>

  // </React.StrictMode>,
);
