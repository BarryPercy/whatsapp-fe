import { Chat, User } from "../redux/interfaces";
import "../css/NewChat.css";
import { memo } from "react";

interface IProps {
  chatInfo: Chat;
  allUsers: User[];
}

function NewChat(props: IProps) {
  const timestamp = new Date().toLocaleString();
  const currentUserId = localStorage.getItem("userId")?.toString();
  let leftUserId = "";
  props.chatInfo.members.forEach((member) => {
    if (currentUserId !== member._id) {
      leftUserId = member._id;
    }
  });
  const leftUser = props.allUsers.find((user) => user._id === leftUserId)!;
  console.log(leftUser);
  return (
    <>
      {
        <div key={leftUserId} className="my-2 singleChat">
          <div className="d-flex align-items-center ml-3 my-2">
            <div className="align-items-center justify-content-center img-container">
              <img src={leftUser.avatar} alt="avatar" id="singleAvatar" />
            </div>
            <div id="rightSChat">
              <div className="d-flex flex-grow-1 ml-3 align-items-center msg">
                <div className="flex-grow-1 my-3">
                  <p className="mb-0"></p>
                  <span id="nameSChat">{leftUser.name}</span>
                </div>
                <span className="mr-3">{leftUser.status}</span>
              </div>
              <div id="time">
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
export default memo(NewChat);
