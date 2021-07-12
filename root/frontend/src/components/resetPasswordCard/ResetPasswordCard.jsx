import "./resetPasswordCard.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "../card/Card";
import { useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";

const ResetPasswordCard = () => {
  const password = useRef();
  const confirmPassword = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const resetUserPassword = (event) => {
    event.preventDefault();

    const data = {
      resetToken: id,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value
    };

    const result = dispatch(resetPassword(data));
    
    result.then(res => {
      if (res === true) {
        history.push("/");
      }
    });
  };

  return(
    <div className="reset-password-card">
      <Card>
        <form
          className="reset-password-form" 
          noValidate
          onSubmit={ resetUserPassword }
        >
          <div className="form-text">
            <span>
              Enter your new Password
            </span>
          </div>
          <div className="form-control">
            <TextField
              type="password"
              autoComplete="on"
              className="form-input"
              label="New Password"
              variant="outlined"
              inputRef={ password }
            />
          </div>
          <div className="form-control">
            <TextField
              type="password"
              autoComplete="on"
              className="form-input"
              label="Confirm Password"
              variant="outlined"
              inputRef={ confirmPassword}
            />
          </div>
          <div className="form-control execute-button last-element">
            <Button
              variant="contained" 
              className="cancel-button"
              onClick={ () => history.push("/") }
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained" 
              className="reset-password-button"
              color="primary"
              type="submit"
            >
              Change
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordCard;
