import { useState, useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      const isLogged = await auth.signin(username, password);
      if (isLogged) {
        navigate("/");
      } else {
        alert("Error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h2>Login</h2>
      </div>
      <div className="login-inputs">
        <input
          type="text"
          value={username}
          placeholder="Write your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Write your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
