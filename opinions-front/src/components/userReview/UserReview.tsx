import { useState, useEffect, useContext } from "react";
import { MdRateReview } from "react-icons/md";

import "./UserReview.css";
import { AuthContext, AuthContextProps } from "../../contexts/Auth/AuthContext";
import { Rating } from "@mui/material";

interface UserReviewProps {
  onClose: () => void;
  data: {
    id: string;
    type: string;
  };
}

const UserReview = ({ onClose, data }: UserReviewProps) => {
  const auth = useContext(AuthContext);

  const { user }: AuthContextProps = useContext(AuthContext);
  const token = auth.tokenGetter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState<number | null>(null);

  const maxTitleLength = 20;

  const handleSubmit = async () => {
    if (token && data.id && data.type && user && title && description && rate) {
      if (title.length > maxTitleLength) {
        alert(`Title must be at most ${maxTitleLength} characters long.`);
        return;
      }
      const review = await auth.reviewCreate(
        token,
        parseInt(data.id, 10),
        data.type,
        user,
        title,
        description,
        rate
      );
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
      <MdRateReview className="review-icon" />
      <h2 className="review-title">
        Did you like the video? Leave your opinion!
      </h2>
      <div className="review-content">
        <div className="review-card-rating">
          <p className="review-rate">
            Rating from 0 to 10:
            <Rating
              className="review-rate-stars"
              name="rating"
              value={rate !== null ? rate / 2 : 0}
              precision={1}
              onChange={(_, value) => setRate(value !== null ? value * 2 : 0)}
              max={10}
              sx={{ fontSize: "2em" }}
            />
          </p>
        </div>
        <input
          className="review-input"
          type="text"
          placeholder="Give your review a name"
          value={title}
          onChange={(e) => {
            const inputTitle = e.target.value;
            if (inputTitle.length <= maxTitleLength) {
              setTitle(inputTitle);
            } else {
              alert(`Title must be at most ${maxTitleLength} characters long.`);
            }
          }}
        />
        <textarea
          className="review-textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
          <button className="review-submit" onClick={handleSubmit}>
            Submit Review
          </button>
          <button className="review-close" onClick={handleClose}>
            Close Review
          </button>
      </div>
    </div>
  );
};

export default UserReview;
