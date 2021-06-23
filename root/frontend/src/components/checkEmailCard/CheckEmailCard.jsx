import "./checkEmailCard.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Card from "../card/Card";

const CheckEmailCard = () => {

  const history = useHistory();

  const backToAuthPage = () => {
    history.push("/");
  }

  return (
    <div className="check-email-card">
      <Card>
        <form className="check-email-form" noValidate>
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
            />
          </div>
          <div className="form-btn-block">
            <Button
              variant="contained" 
              className="cancel-button"
              onClick={ backToAuthPage }
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained" 
              className="search-button"
              color="primary"
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CheckEmailCard;
