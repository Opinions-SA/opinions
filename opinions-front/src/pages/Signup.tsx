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

  const handleRegister = async () => {
    if (username && email && password && passwordConfirm) {
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
          onBlur={(e) => validateField("email", e.target.value)}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          onChange={(e) => setPassword(e.target.value)}
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
          onBlur={() => {
            if (password && passwordConfirm) setIsPasswordMatch(password === passwordConfirm)
          }}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
