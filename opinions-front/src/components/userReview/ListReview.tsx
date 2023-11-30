
import { useEffect, useState } from 'react';
import './ListReview.css'
import { Review } from '../../interface/Review';

const moviesApiURL: string = import.meta.env.VITE_API;

interface ListReviewProps {
  data: {
    id: string;
    type: string;
  };
};

const ListReview = ({ data }: ListReviewProps) => {

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReview = async () => {
      const reviewUrl: string = `${moviesApiURL}/review/streaming?streamingId=${data.id}&streamingType=${data.type}`;
      const options: RequestInit = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };
      const res = await fetch(reviewUrl, options);
      const reviewData: Review[] = await res.json();
      setReviews(reviewData);
    };

    getReview();
  }, [data.id, data.type]);
  
 
  return (
    <div>
      {reviews.map((review) => (
        <div className="review-list-container">
          <div className="review-list-content" key={review.id}>
            <div className='title-list-review'>
              <h1>{review.title}</h1>
            </div>
            <div className='description-list-review'>
              <p>{review.description}</p>
              <p>Rating: {review.rate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListReview;