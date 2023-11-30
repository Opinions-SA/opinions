import { useState, useContext, useEffect } from "react";
import { AuthContext, AuthContextProps } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";

import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";

register();

import "../styles/Profile.css";
import ListReview from "../components/userReview/ListReview";

const apiURL: string = import.meta.env.VITE_API;

const Profile = () => {
  const [SlidePerView, setSlidePerView] = useState(1);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { user }: AuthContextProps = useContext(AuthContext);

  const reviewUrl: string = `${apiURL}/review/user`;

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleEdit = async () => {
    if (username && email && phone) {
      if (username != user?.username) await validateField("username", username);
      if (email != user?.email) await validateField("email", email);
      if (phone != user?.phone) await validateField("phone", phone);
    }
  };

  const validateField = async (field: string, value: string) => {
    if (value) {
      const isValidField = await auth.validateField(field, value);
      const inputElement = document.querySelector(`input[name="${field}"]`);
      if (!inputElement) return;
      if (!isValidField) {
        inputElement.classList.add("input-error");
        inputElement.classList.remove("input-valid");
      } else {
        inputElement.classList.remove("input-error");
        inputElement.classList.add("input-valid");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-inputs">
        <BiSolidUserCircle className="user-icon" />
        <input
          name="username"
          type="text"
          value={username}
          placeholder="Write your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Write your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="phone"
          type="text"
          value={phone}
          placeholder="Write your phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="profile-button" onClick={handleEdit}>
          Confirm
        </button>
      </div>
      {/* List of reviews */}
      <div className="list-profile-container">
      <h1 className="list-reviews-title">Your Reviews</h1>
          <div className="review-profile-content">
            <Swiper
              className="profile-cards"
              slidesPerView={SlidePerView}
              navigation
            >
                <SwiperSlide className="profile-card">
                  {user && <ListReview url={reviewUrl} />}
                </SwiperSlide>
            </Swiper>
          </div>
        </div>
    </div>
  );
};

export default Profile;
