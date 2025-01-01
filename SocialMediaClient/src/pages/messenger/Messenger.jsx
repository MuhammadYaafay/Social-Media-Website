import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";

const Messenger = () => {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper"></div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
