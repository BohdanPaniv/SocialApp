import "./homeRightBar.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getFollowing } from "../../store/actions/userActions";
import Contact from "../contact/Contact";

const HomeRightBar = ({ user }) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState();

  useEffect(() => {
    const data = dispatch(getFollowing({ following: user.following }));
    let isMount = true;

    data.then(res => {
      if (isMount && res) {
        setFollowing(res.data.following);
      }
    });

    return () => {
      isMount = false;
    };
  }, [dispatch, user]);

  return(
    <div className="home-right-bar">
      <h2 className="title">
          Following
      </h2>
      <ul className="frient-list">
        {following && following.map((contact, index) => (
            <Contact
              key={contact.userId}
              contact={contact}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default HomeRightBar;
