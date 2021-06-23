import "./loginCard.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import Card from "../card/Card";

const LoginCard = ({ isLogin, setIsLogin }) => {

  const history = useHistory();

  const changeIsLogin = () => {
    setIsLogin(!isLogin);
  }

  const changePasswordLink = (event) => {
    event.preventDefault();
    
    history.push("/changePassword");
  }

  return (
    <div className="login-card">
      <Card>
        <form className="login-form" noValidate>
          <div className="form-control">
            <TextField
              type="email"
              className="form-input"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="form-control">
            <TextField 
              type="password"
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
}

export default LoginCard;
