import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileImg from "../../assets/Profile.svg";
import "./Navbar.css";
function Navbar() {
    const {user,logout}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleLogout =() =>{
        logout();
        navigate("/login");
    };
    return (
        <nav className="navbar-layout">
            <div className="search-section">
                <div className="search-bar">
                    <FiSearch className="search-icon"></FiSearch>
                    <input type="text" placeholder="Search candidates, jobs..." />
                </div>
            </div>
            <div className="right-section">
                <button className="notification-button">
                    <FiBell />
                </button>
                <button className="profile-button">
                    <div className="user-details">
                        <img src={ProfileImg} alt={user?.name}/>
                        <div className="user-info">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-role">Recruiter</p>
                        </div>
                    </div>
                    <FiChevronDown className="drop-down"></FiChevronDown>
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}
export default Navbar;