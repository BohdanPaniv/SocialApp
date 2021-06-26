import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={4}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);