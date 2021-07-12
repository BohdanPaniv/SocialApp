import "./checkEmailCard.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Card from "../card/Card";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendToEmail } from "../../store/actions/authActions";

const CheckEmailCard = () => {
  const history = useHistory();
  const email = useRef();
  const dispatch = useDispatch();

  const sendToUserMail = (event) => {
    event.preventDefault();

    dispatch(sendToEmail({ email: email.current.value }));
  };

  return (
    <div className="check-email-card">
      <Card>
        <form
          className="check-email-form" 
          noValidate 
          onSubmit={event => sendToUserMail(event) }
        >
          <div className="form-text">
            <span>
              Please enter your email
            </span>
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
          <div className="form-btn-block">
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
              className="search-button"
              color="primary"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CheckEmailCard;
