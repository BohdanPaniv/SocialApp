import { TextField, Button } from '@material-ui/core';
import { useRef } from 'react';
import "./changeName.scss";
import { changeName } from "../../../store/actions/userActions";
import { useDispatch } from "react-redux";

const ChangeName = ({ user, setIsChangeName }) => {
  const dispatch = useDispatch();
  const name = useRef();
  const surname = useRef();

  const changeUserName = (event) => {
    event.preventDefault();

    const data = {
      userId: user._id,
      name: name.current.value,
      surname: surname.current.value
    };

    dispatch(changeName({ data, setIsChangeName }));
  };

  return (
    <form
     className="change-name"
     noValidate
     onSubmit={event => changeUserName(event) }
    >
      <div className="form-control">
        <TextField
          id="standard-basic" 
          label="First Name"
          inputRef={ name }
          defaultValue={ user.name }
        />
      </div>
      <div className="form-control">
        <TextField
          id="standard-basic" 
          label="Surname"
          inputRef={ surname }
          defaultValue={ user.surname }
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
          onClick={ () => setIsChangeName(false) }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ChangeName;