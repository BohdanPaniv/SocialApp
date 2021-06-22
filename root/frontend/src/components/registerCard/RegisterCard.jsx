import "./registerCard.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const RegisterCard = ({ isLogin, setIsLogin }) => {

  const changeIsLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <form className="register-form" noValidate>
      <div className="form-control-register">
        <TextField 
          className="form-input-register"
          label="Name"
          variant="outlined"/>
      </div>
      <div className="form-control-register">
        <TextField 
          className="form-input-register"
          label="Surname"
          variant="outlined"/>
      </div>
      <div className="form-control-register">
        <TextField 
          type="email"
          className="form-input-register"
          label="Email"
          variant="outlined"/>
      </div>
      <div className="form-control-register">
        <TextField 
          type="password"
          autoComplete="on"
          className="form-input-register"
          label="Password" 
          variant="outlined" />
      </div>
      <div className="form-action-register">
        <Button
          variant="contained" 
          className="create-acount-button"
          color="primary">
            Sign Up
        </Button>
      </div>
      <div className="form-text-register">
        <span>Already have Account?</span>
      </div>
      <div className="form-action-register last-element">
        <Button 
          variant="contained" 
          className="log-into-button"
          onClick={ changeIsLogin }
          color="primary">
            Log into Account
        </Button>
      </div>      
    </form>
  );
}

export default RegisterCard;
