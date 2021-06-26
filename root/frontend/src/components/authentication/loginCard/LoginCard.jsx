import "./loginCard.scss";
import { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import Card from "../../card/Card";
import { logIn } from "../../../store/actions/authActions";
import { connect } from 'react-redux';

const LoginCard = ({
  isLogin,
  setIsLogin,
  logIn
}) => {
  const history = useHistory();
  const email = useRef();
  const password = useRef();

  const changeIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const changePasswordLink = (event) => {
    event.preventDefault();
    
    history.push("/changePassword");
  };

  const signIn = (event) => {
    event.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value
    };

    logIn(user);
  };

  return (
    <div className="login-card">
      <Card>
        <form className="login-form" noValidate onSubmit={event => signIn(event) }>
          <div className="form-control">
            <TextField
              type="email"
              inputRef={ email }
              className="form-input"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="form-control">
            <TextField 
              type="password"
              inputRef={ password }
              autoComplete="on"
              className="form-input"
              label="Password" 
              variant="outlined"
            />
          </div>
          <div className="form-action">
            <Button
              variant="contained" 
              className="login-button"
              color="primary"
              type="submit"
            >
              Log In
            </Button>
          </div>
          <div className="form-text">
            <Link
              component="button"
              onClick={ event => changePasswordLink(event) }
              className="change-password-link"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="form-action last-element">
            <Button 
              variant="contained" 
              className="create-button"
              color="primary"
              onClick={ changeIsLogin }
            >
              Create New Account
            </Button>
          </div>      
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error
});

const mapDispatchToProps = { logIn };

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);
