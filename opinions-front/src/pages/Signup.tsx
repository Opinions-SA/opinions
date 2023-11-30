import { useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";

import "../styles/Login.css";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState<Boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<Boolean | null>(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState<Boolean | null>(null);

  const isPasswordValid = (value: string): boolean => {
    if (value.length < 8) {
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      return false;
    }
    if (!/[\W_]/.test(value)) {
      return false;
    }

    return true;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordConfirm) {
      setIsPasswordMatch(value === passwordConfirm);
    }
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (password) {
      setIsPasswordMatch(value === password);
    }
  };

  const isEmailValidFormat = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailValid(isEmailValidFormat(value));
  };

  const handleRegister = async () => {
    if (username && email && password && passwordConfirm) {
      if (!isEmailValidFormat(email)) {
        return alert("Invalid email format!");
      }
      
      if (!isPasswordValid(password)) {
        return alert(
          "The password must contain at least 8 characters, have 1 capital letter and 1 symbol!"
        );
      }

      if (password !== passwordConfirm) {
        setIsPasswordMatch(false);
        return alert("Passwords do not match!");
      }

      const isRegister = await auth.signup(username, email, password);
      if (isRegister) {
        navigate("/login");
      }
    }
  };

  const validateField = async (field: string, value: string) => {
    if (value) {
      const isValidField = await auth.validateField(field, value);
      switch (field) {
        case "username":
          setIsUsernameValid(isValidField ?? null);
          break;
        case "email":
          setIsEmailValid(isValidField ?? null);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-inputs">
        <BiSolidUserCircle className="user-icon" />
        <input
          name="username"
          type="text"
          value={username}
          placeholder="Write your username"
          className={
            isUsernameValid === null
              ? ""
              : isUsernameValid
              ? "input-valid"
              : "input-error"
          }
          onBlur={(e) => validateField("username", e.target.value)}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Write your email"
          className={
            isEmailValid === null
              ? ""
              : isEmailValid
              ? "input-valid"
              : "input-error"
          }
          onBlur={() => setIsEmailValid(isEmailValidFormat(email))}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        {/* <input
          name="email"
          type="text"
          value={email}
          placeholder="Write your email"
          className={
            isEmailValid === null
              ? ""
              : isEmailValid
              ? "input-valid"
              : "input-error"
          }
          onBlur={(e) => validateField("email", e.target.value)}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Write your password"
          className={
            isPasswordMatch === null
              ? ""
              : isPasswordMatch
              ? "input-valid"
              : "input-error"
          }
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <input
          name="confirmPassword"
          type="password"
          value={passwordConfirm}
          placeholder="Confirm your password"
          className={
            isPasswordMatch === null
              ? ""
              : isPasswordMatch
              ? "input-valid"
              : "input-error"
          }
          onBlur={() => setIsPasswordMatch(password === passwordConfirm)}
          onChange={(e) => handlePasswordConfirmChange(e.target.value)}
        />
        <button className="login-button" onClick={handleRegister}>
          Sign up
        </button>
        <div className="signup-content">
          <label>Already have an account?</label>
          <button className="signup-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
