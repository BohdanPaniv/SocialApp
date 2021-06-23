import "./registerCard.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from "../card/Card";

const RegisterCard = ({ isLogin, setIsLogin }) => {

  const changeIsLogin = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className="register-card">
      <Card>
        <form className="register-form" noValidate>
          <div className="form-control">
            <TextField 
              className="form-input"
              label="Name"
              variant="outlined"
            />
          </div>
          <div className="form-control">
            <TextField 
              className="form-input"
              label="Surname"
              variant="outlined"
            />
          </div>
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
              className="create-acount-button"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
          <div className="form-text">
            <span>Already have Account?</span>
          </div>
          <div className="form-action last-element">
            <Button 
              variant="contained" 
              className="log-into-button"
              onClick={ changeIsLogin }
              color="primary"
            >
              Log into Account
            </Button>
          </div>      
        </form>
      </Card>
    </div>
  );
}

export default RegisterCard;
