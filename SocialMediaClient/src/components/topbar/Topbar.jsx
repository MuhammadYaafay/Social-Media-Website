import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/messenger");
  }

  return (
    <div className="topbarContainer">
      {/* Left Section */}
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social</span>
        </Link>
      </div>

      {/* Center Section */}
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="topbarRight">
        <div className="topbarLink">
          <span className="link">Home</span>
          <span className="link">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem" onClick={handleChatClick}>
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
