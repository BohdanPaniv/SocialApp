import "./share.scss";
import { PermMedia, Cancel } from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { createPost } from "../../store/actions/postsActions";
import { Link } from "react-router-dom";

const Share = ({ isHome, profilePictureName }) => {
  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const description = useRef();
  const ownerLink = `/profile/${user._id}`;

  const sharePost = (event) => {
    event.preventDefault();
    let text = description.current.value;
    
    if (text || file) {
      const post = {
        userId: user._id,
        description: text,
        postImageName: file,
        createdAt: Date.now()
      };

      dispatch(createPost({ post, isHome }));
  
      setFile(null);
      description.current.value = null;
    }
  };

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
          onClick={ () => setFile(null) }
        />
      </div>
    );
  };

  const setPostImage = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    event.target.value = null;
  };

  return (
    <div className="share">
      <form
        className="share-form"
        noValidate 
        onSubmit={event => sharePost(event)}
      >
        <div className="form-top">
          <div className="form-content">
            <Link 
              to={ownerLink}
              className="link-container"
            >
              <img
                src={profilePictureName}
                alt=""
                className="share-icon"
              />
            </Link>
          </div>
          <div className="form-control">
            <TextField
              id="filled-multiline-flexible"
              label="What's up?"
              multiline
              variant="filled"
              inputRef={description}
              className="form-input"
            />
          </div>
        </div>
        {file && (
          <ImageContainer />
        )}
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
                  onChange={event => setPostImage(event)}
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
