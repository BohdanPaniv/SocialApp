import "./homeRightBar.scss";
import Contact from "../contact/Contact";

const HomeRightBar = ({ user }) => {
  return(
    <div className="home-right-bar">
      <h2 className="title">
          Following
      </h2>
      <ul className="frient-list">
        {
          user.following.map((user, id) => (
            <Contact
              key={ id }
              contact={ user }
            />
          ))
        }
      </ul>
    </div>
  )
}

export default HomeRightBar;
