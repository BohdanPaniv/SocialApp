import { TextField, Button } from '@material-ui/core';
import { useRef } from 'react';
import "./changePassword.scss";
import { changePassword } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";

const ChangePassword = ({ user, setIsChangePassword }) => {
  const dispatch = useDispatch();
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const changeUserPassword = (event) => {
    event.preventDefault();

    const data = {
      userId: user._id,
      currentPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      confirmPassword: confirmPassword.current.value
    };

    dispatch(changePassword({ data, setIsChangePassword }));
  };

  return (
    <form
     className="change-password"
     noValidate
     onSubmit={event => changeUserPassword(event)}
    >
      <div className="form-control">
        <TextField
          id="standard-basic1" 
          label="Current Password"
          inputRef={currentPassword}
          type="password"
          autoComplete="on"
        />
      </div>
      <div className="form-control">
        <TextField
          id="standard-basic2" 
          label="New Password"
          inputRef={newPassword}
          type="password"
          autoComplete="on"
        />
      </div>
      <div className="form-control">
        <TextField
          id="standard-basic3" 
          label="Confirm Password"
          inputRef={confirmPassword}
          type="password"
          autoComplete="on"
        />
      </div>
      <div className="form-action">
        <Button
          variant="contained" 
          color="primary"
          className="save-btn"
          type="submit"
        >
          Save
        </Button>
        <Button
          variant="contained" 
          color="primary"
          className="cancel-btn"
          onClick={() => setIsChangePassword(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
