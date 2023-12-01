import { useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";

import "../styles/Login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.signin(email, password);
      if (isLogged) {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-inputs">
      <BiSolidUserCircle className="user-icon"/>
        <input
          type="text"
          value={email}
          placeholder="Write your Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Write your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        <div className="signup-content">
          <label>Don't have an account yet?</label>
          <button className="signup-button" onClick={(() => {navigate("/register")})}>Create now</button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;