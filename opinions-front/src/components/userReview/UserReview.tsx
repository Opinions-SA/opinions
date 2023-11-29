import { useState, useEffect } from "react";
import { MdRateReview } from "react-icons/md";

import "./UserReview.css";

const UserReview = ({ onClose }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`review-container ${isVisible ? "show" : ""}`}>
      <MdRateReview className="review-icon"/>
      <h2 className="review-title">Did you like the video? Leave your opinion!</h2>
      <div className="review-content">
        <input className="review-input" type="text" placeholder="Give your review a name" />
        <textarea className="review-textarea" placeholder="Description" />
        <button className="review-submit">Submit Review</button>
        <button className="review-close" onClick={handleClose}>
          Close Review
        </button>
      </div>
    </div>
  );
};

export default UserReview;
