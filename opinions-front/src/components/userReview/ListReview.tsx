
import { useEffect, useState, useContext } from 'react';
import './ListReview.css'
import { Review } from '../../interface/Review';
import { AuthContext } from '../../contexts/Auth/AuthContext';

interface ListReviewProps {
  url: string
};

const apiURL: string = import.meta.env.VITE_API;

const ListReview = ({ url }: ListReviewProps) => {

  const auth = useContext(AuthContext);

  const [userToken, setUserToken] = useState<string>(""); 
  const [reviews, setReviews] = useState<Review[]>([]);

  const createStreamingLink: any = (review: Review) => {
    return url = `${apiURL}/streaming/${review.streaming.media_type}/${review.streaming.id}`
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await auth.tokenGetter();
        setUserToken(response ? response.toString() : "");
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const getReview = async () => {
      const reviewUrl: string = url;
      const headers: HeadersInit = {
        accept: 'application/json',
      };

      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      }

      const options: RequestInit = {
        method: 'GET',
        headers: headers,
      };

      const res = await fetch(reviewUrl, options);
      const reviewData: Review[] = await res.json();
      setReviews(reviewData);
    };

    getReview();
  }, [url, userToken]);
  
 
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