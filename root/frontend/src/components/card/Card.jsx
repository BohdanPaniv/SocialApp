import "./card.scss";

const Card = ({ children }) => {
  return (
    <div className="card-container">
      {children}
    </div>
  );
};

export default Card;
