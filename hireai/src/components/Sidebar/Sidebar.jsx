import AIimg from "../../assets/Hire_ai.svg";
import ProfileImg from "../../assets/Profile.svg";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { LuLayoutDashboard, LuBriefcaseBusiness, LuUsers, LuFileSearch, LuCalendarCheck2, LuSettings } from "react-icons/lu";
function Sidebar() {
    return (
        <aside className="side-bar">
            <img src={AIimg} alt="Hire AI" />
            <nav className="navigation-menu">
                <div className="navigation-item">
                    <LuLayoutDashboard size={20} />
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
                <div className="navigation-item">
                    <LuBriefcaseBusiness size={20} />
                    <NavLink to="/jobs/jobsPage">Jobs</NavLink>
                </div>
                <div className="navigation-item">
                    < LuUsers size={20} />
                    <NavLink to="/applications">Applications</NavLink>
                </div>
                <div className="navigation-item active">
                    <LuFileSearch size={20} />
                    <a className="navigation-content">AI Resume</a>
                </div>
                <div className="navigation-item">
                    <LuCalendarCheck2 size={20} />
                    <a className="navigation-content">Interviews</a>
                </div>
                <div className="navigation-item">
                    <LuSettings size={20} />
                    <a className="navigation-content">Settings</a>
                </div>
            </nav>
            <div className="spacer"></div>
            <div className="user-details-2">
                <img src={ProfileImg} alt="Emily Carter" />
                <div className="user-info">
                    <p className="user-name">Emily Carter</p>
                    <p className="user-role">Recruiter</p>
                </div>
            </div>
        </aside>
    );
}
export default Sidebar;