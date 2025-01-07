import "./rightbar.css";
import Online from "../online/Online";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [error, setError] = useState(null);

  // UseEffect to check if user exists and then update followed state
  useEffect(() => {
    if (user?._id) {
      setFollowed(currentUser?.followings?.includes(user._id));
    }
  }, [user, currentUser]);

  // Fetch friends data
  useEffect(() => {
    if (user?._id) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        }
      };
      getFriends();
    }
  }, [user]);

  // Fetch online users
  useEffect(() => {
    if (user?._id) {
      const getOnlineUsers = async () => {
        try {
          const res = await axios.get(`/api/users/friends/online/${user._id}`);
          setOnlineUsers(res.data);
        } catch (err) {
          setError("Failed to fetch online users.");
          console.error("Error fetching online users:", err);
        }
      };
      getOnlineUsers();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed((prev) => !prev);  // Toggle after successful request
    } catch (err) {
      console.error(err.response?.data || "Error in follow/unfollow request");
      alert(err.response?.data || "An error occurred");
    }
  };

  // Rightbar for home
  const HomeRightbar = () => (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="rightbarFriendList">
        {onlineUsers.map((u) => (
          <Online key={u._id} user={u} />
        ))}
      </ul>
    </>
  );

  // Rightbar for profile page
  const ProfileRightbar = () => (
    <>
      {user?.username !== currentUser?.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user?.city || "N/A"}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user?.from || "N/A"}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user?.relationship === 1
              ? "Single"
              : user?.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }} key={friend._id}>
            <div className="rightbarFollowing">
              <img
                src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
