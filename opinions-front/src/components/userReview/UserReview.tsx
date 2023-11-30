import { useState, useEffect, useContext } from "react";
import { MdRateReview } from "react-icons/md";

import "./UserReview.css";
import { AuthContext, AuthContextProps } from "../../contexts/Auth/AuthContext";

interface UserReviewProps {
  onClose: () => void;
  data: {
    id: string;
    type: string;
  };
};

const UserReview = ({ onClose, data }: UserReviewProps) => {
  const auth = useContext(AuthContext);

  const { user }: AuthContextProps = useContext(AuthContext);
  const token = auth.tokenGetter();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (token && data.id && data.type && user && title && description && rate) {
      const review = await auth.reviewCreate(token, parseInt(data.id, 10), data.type, user, title, description, rate);
      if (review) {
        onClose();
        window.location.reload();
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`review-container`}>
      <MdRateReview className="review-icon"/>
      <h2 className="review-title">Did you like the video? Leave your opinion!</h2>
      <div className="review-content">
        <input className="review-input" type="text" placeholder="Give your review a name" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea className="review-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <select
          id="rate"
          value={rate !== null ? rate.toString() : ''}
          onChange={(e) => setRate(parseInt(e.target.value, 10))}
        >
          <option value="">Select a rating</option>
          {[...Array(11)].map((_, index) => (
            <option key={index} value={index.toString()}>
              {index}
            </option>
          ))}
        </select>
        <button className="review-submit" onClick={handleSubmit}>Submit Review</button>
        <button className="review-close" onClick={handleClose}>
          Close Review
        </button>
      </div>
    </div>
  );
};

export default UserReview;
