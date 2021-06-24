import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider maxSnack={4}>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);