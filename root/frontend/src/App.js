import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loadUser } from "./store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Contacts from "./pages/contacts/Contacts";
import Bookmarks from "./pages/bookmarks/Bookmarks";

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
                <Home />
              </Route>
              <Route exact path="/profile/:id">
                <Profile />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/contacts/:id">
                <Contacts />
              </Route>
              <Route path="/bookmarks/">
                <Bookmarks />
              </Route>
              <Redirect to="/" />
            </Switch>
          )
          :
          (
            <Switch>
              <Route exact path="/">
                <Authentication />
              </Route>
              <Route path="/resetPassword/:id">
                <ResetPassword confirmed/>
              </Route>
              <Route path="/resetPassword">
                <ResetPassword />
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
