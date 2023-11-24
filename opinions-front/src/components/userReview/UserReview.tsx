import "./UserReview.css";

const UserReview = () => {

  return (
    <>
      <div className="review-container">
        <h2 className="review-title">Gostou do filme? Deixe sua opinião!</h2>
        <div className="review-content">
            <input className="review-input-1" type="text" placeholder="De um nome a sua review"/>
            <textarea className="review-input-2" placeholder="Descrição"/>
        </div>
      </div>
    </>
  );
};

export default UserReview;
