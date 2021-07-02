import "./contact.scss";

const Contact = ({ contact }) => {

  const contractInfo = `${ contact.name } ${ contact.surname }`;

  return (
    <li className="contact">
      <div className="image-container">
        <img src={ contact.image } alt="error" className="image" />
      </div>
      <span className="user-name">
        { contractInfo }
      </span>
    </li>
  );
};

export default Contact;
