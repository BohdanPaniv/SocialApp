import "./changePasswordCard.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const changePasswordCard = () => {
  return (
    <form className="change-password-form" noValidate>
      <div className="change-password-form-text">
        <span>
          Please enter your email
        </span>
      </div>
      <div className="change-password-form-control">
        <TextField
          type="email"
          className="change-password-form-input"
          label="Email"
          variant="outlined"/>
      </div>
      <div className="change-password-form-btn-block">
        <Button
          variant="contained" 
          className="change-password-cancel-button"
          href="/"
          color="primary">
            Cancel
        </Button>
        <Button
          variant="contained" 
          className="change-password-search-button"
          color="primary">
            Search
        </Button>
      </div>
    </form>
  );
}

export default changePasswordCard;
