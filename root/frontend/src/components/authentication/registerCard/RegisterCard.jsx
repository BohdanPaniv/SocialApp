import "./registerCard.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from "../../card/Card";
import { useCallback, useEffect, useRef } from "react";
import { register } from "../../../store/actions/authActions";
import { connect } from 'react-redux';
import { REGISTER_SUCCESS } from "../../../store/actions/types";

const RegisterCard = ({
    isLogin,
    setIsLogin,
    register,
    response
}) => {
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();

  const changeIsLogin = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin, setIsLogin]);

  const signUp = (event) => {
    event.preventDefault();

    const user = {
      name: name.current.value,
      surname: surname.current.value,
      email: email.current.value,
      password: password.current.value
    };

    register(user);
  };

  useEffect(() => {
    if (response.id === REGISTER_SUCCESS){
      changeIsLogin();
    }
  }, [response, changeIsLogin]);

  return (
    <div className="register-card">
      <Card>
        <form className="register-form" noValidate onSubmit={event => signUp(event) }>
          <div className="form-control">
            <TextField 
              className="form-input"
              label="Name"
              variant="outlined"
              inputRef={ name }
            />
          </div>
          <div className="form-control">
            <TextField 
              className="form-input"
              label="Surname"
              variant="outlined"
              inputRef={ surname }
            />
          </div>
          <div className="form-control">
            <TextField 
              type="email"
              className="form-input"
              label="Email"
              variant="outlined"
              inputRef={ email }
            />
          </div>
          <div className="form-control">
            <TextField 
              type="password"
              autoComplete="on"
              className="form-input"
              label="Password" 
              variant="outlined"
              inputRef={ password }
            />
          </div>
          <div className="form-action">
            <Button
              variant="contained" 
              className="create-acount-button"
              color="primary"
              type="submit"
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
};

const mapStateToProps = (state) => ({
  response: state.response
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);
