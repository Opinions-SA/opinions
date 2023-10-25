import { useState, useContext } from "react"
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email && password) {
            const isLogged = await auth.signin(email, password);
            if(isLogged) {
                navigate('/');
            } else {
                alert("Error");
            }
        }
    }

    return (
        <div>
            <h2>Sign In</h2>

            <input type="text" value={email} placeholder="Write your email" onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Write your password" onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}