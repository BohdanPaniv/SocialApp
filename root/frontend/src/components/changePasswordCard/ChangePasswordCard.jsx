import "./changePasswordCard.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "../card/Card";

const ChangePasswordCard = () => {
  return(
    <div className="change-password-card">
      <Card>
        <form className="change-password-form" noValidate>
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
            />
          </div>
          <div className="form-control">
            <TextField
              type="password"
              autoComplete="on"
              className="form-input"
              label="Repeat Password"
              variant="outlined"
            />
          </div>
          <div className="form-control 
                          execute-button 
                          last-element"
          >
            <Button
              variant="contained" 
              className="change-password-button"
              color="primary"
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChangePasswordCard;
