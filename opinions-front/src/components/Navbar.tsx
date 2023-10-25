import { useState, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai"

import "../styles/Navbar.css";
import { AuthContext } from "../contexts/Auth/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    // window.location.href = window.location.href;
  }

  const handleLogin = async () => {
    navigate('/login');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  }

  return (
    <nav id="navbar">
      <h2>
        <Link to="/"><BiCameraMovie />Movies</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search a movie" onChange={(e) => setSearch(e.target.value)} value={search}/>
        <button type="submit">
          <BiSearchAlt2 />
        </button>
        {auth.user ? (
          <h2>
            <AiOutlineUser /> <a href="" onClick={handleLogout}>Signout</a>
          </h2>
        ) : (
          <h2>
            <AiOutlineUser /> <a href="" onClick={handleLogin}>Signin</a>
          </h2>
        )}
      </form>
    </nav>
  )
}

export default Navbar;
