import { useState, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

import "./Navbar.css";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const [search, setSearch] = useState<string>("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    // window.location.href = window.location.href;
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie />
          OPINIONS
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a movie"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
        <div className="icon-spacer" >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
        
          <BiMenu />
        </IconButton>
        </div>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText primary="Home" />
            </ListItem>
            {auth.user ? (
              <div>
                <ListItem
              button
              onClick={() => navigate("/profile")}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
              </div>
            
            ) : (
              <ListItem button onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </form>
    </nav>
  );
};

export default Navbar;
