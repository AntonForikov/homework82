import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline/>
      <App />
    </BrowserRouter>
  </Provider>,
);
