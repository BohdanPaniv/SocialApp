import "./share.scss";
import {
  PermMedia,
  Cancel
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { createPost } from "../../store/actions/userPostsActions";

const Share = () => {
  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const description = useRef();

  const sharePost = (event) => {
    event.preventDefault();

    const post = {
      userId: user.id,
      description: description.current.value,
      image: file,
      createdAt: Date.now()
    };

    dispatch(createPost(post));

    setFile(null);
    description.current.value = null;
  }

  const ImageContainer = () => {
    return(
      <div className="image-container">
        <img 
          className="image"
          src={ URL.createObjectURL(file) } 
          alt="" 
        />
        <Cancel
          className="cancel-btn" 
          onClick={() => setFile(null)}
        />
      </div>
    );
  }

  return (
    <div className="share">
      <form
        className="share-form"
        noValidate 
        onSubmit={event => sharePost(event)}
      >
        <div className="form-top">
          <div className="form-content">
            <img
              src="/assets/lion.jpg"
              alt=""
              className="share-icon"
            />
          </div>
          <div className="form-control">
          <TextField
            id="filled-multiline-flexible"
            label={`What's on your mind, ${user.name}?`}
            multiline
            variant="filled"
            inputRef={ description }
            className="form-input"
          />
          </div>
        </div>
        {
          file && 
          (
            <ImageContainer />
          )
        }
        <div className="form-bottom">
          <div className="options">
            <div className="option">
              <label htmlFor="file">
                <PermMedia
                  className="icon"
                  htmlColor="green"
                />
                <span className="option-text">
                  Photo
                </span>
                <input
                  type="file"
                  className="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={event => setFile(event.target.files[0])}
                />
              </label>
            </div>
            <div className="form-action">
              <Button
                variant="contained"
                className="share-btn"
                type="submit"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Share;
