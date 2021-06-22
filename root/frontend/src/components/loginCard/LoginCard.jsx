import "./loginCard.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const LoginCard = ({ isLogin, setIsLogin }) => {

  const changeIsLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <form className="login-form" noValidate>
      <div className="form-control-login">
        <TextField
          type="email"
          className="form-input-login"
          label="Email"
          variant="outlined"/>
      </div>
      <div className="form-control-login">
        <TextField 
          type="password"
          autoComplete="on"
          className="form-input-login"
          label="Password" 
          variant="outlined" />
      </div>
      <div className="form-action-login">
        <Button
          variant="contained" 
          className="login-button"
          color="primary">
            Log In
        </Button>
      </div>
      <div className="form-text-login">
        <Link 
          href="/changePassword" 
          className="link-login">
          Forgot Password?
        </Link>
      </div>
      <div className="form-action-login">
        <Button 
          variant="contained" 
          className="create-button"
          color="primary"
          onClick={ changeIsLogin }>
            Create New Account
        </Button>
      </div>      
    </form>
  );
}

export default LoginCard;
