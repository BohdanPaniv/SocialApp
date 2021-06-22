import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import ChangePassword from "./pages/changePassword/ChangePassword";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Authentication></Authentication>
        </Route>
        <Route path="/changePassword">
          <ChangePassword></ChangePassword>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
