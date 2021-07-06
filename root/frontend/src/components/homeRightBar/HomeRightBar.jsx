import "./homeRightBar.scss";
import Contact from "../contact/Contact";

const HomeRightBar = () => {

  const contact = {
    surname: "Cena",
    name: "John",
    image: "/assets/default-user.png", 
  };

  return(
    <div className="home-right-bar">
      <h2 className="title">
          Contacts
      </h2>
      <ul className="frient-list">
        <Contact contact={ contact } />
        <Contact contact={ contact } />
        <Contact contact={ contact } />
        <Contact contact={ contact } />
        <Contact contact={ contact } />
        <Contact contact={ contact } />
      </ul>
    </div>
  )
}

export default HomeRightBar;
