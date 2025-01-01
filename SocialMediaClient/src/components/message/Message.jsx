import React from "./message.css";

export default function Message({own}) {
  return (
    <div className={own ? "message own":"message"}>
      <div className="messageTop">
        <img className="messageImg" src="assets/person/1.jpeg" alt="" />
        <p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, recusandae.</p>
      </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
