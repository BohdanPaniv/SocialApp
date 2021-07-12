import "./changeUserInfo.scss";
import { TextField, Button } from '@material-ui/core';
import { useRef, useState } from 'react';
import { changeUserInfo } from "../../../store/actions/userActions";
import { useDispatch } from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const ChangeUserInfo = ({ user, setIsChangeUserInfo }) => {
  const dispatch = useDispatch();
  const city = useRef();
  const from = useRef();
  const [relationshipIndex, setRelationshipIndex] = useState(user.relationship);

  const changeUserName = (event) => {
    event.preventDefault();

    const data = {
      userId: user._id,
      city: city.current.value,
      from: from.current.value,
      relationship: relationshipIndex
    };

    dispatch(changeUserInfo({ data, setIsChangeUserInfo }));
  };

  const handleChange = (event) => {
    setRelationshipIndex(event.target.value);
  };

  return (
    <form
     className="change-user-info"
     noValidate
     onSubmit={event => changeUserName(event) }
    >
      <div className="form-control">
        <TextField
          id="standard-basic" 
          label="City"
          inputRef={ city }
          defaultValue={ user.city }
        />
      </div>
      <div className="form-control">
        <TextField
          id="standard-basic" 
          label="From"
          inputRef={ from }
          defaultValue={ user.from }
        />
      </div>
      <FormControl className="form-control">
        <InputLabel id="demo-simple-select-label">
          Relationship
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ relationshipIndex }
          onChange={ handleChange }
        >
          <MenuItem value={0}>
            No info
          </MenuItem>
          <MenuItem value={1}>
            Single
          </MenuItem>
          <MenuItem value={2}>
            In a relationship
          </MenuItem>
          <MenuItem value={3}>
            Merried
          </MenuItem>
        </Select>
      </FormControl>
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
          onClick={ () => setIsChangeUserInfo(false) }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ChangeUserInfo;
