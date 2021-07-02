import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loadUser } from "./store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {
        !auth.isLoading &&
        (
          auth.token ? 
          (
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/changePassword">
                <ChangePassword/>
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
              <Redirect to="/"/>
            </Switch>
          )
          :
          (
            <Switch>
              <Route exact path="/">
                <Authentication/>
              </Route>
              <Route path="/changePassword">
                <ChangePassword/>
              </Route>
              <Redirect to="/"/>
          </Switch>
          )
        )
      }
    </Router>
  );
};

export default App;
