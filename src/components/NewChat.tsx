import { Chat } from "../redux/interfaces";
import "../css/NewChat.css";

interface IProps {
  chatInfo: Chat;
}

function NewChat(props: IProps) {
  return (
    <>
      <div className="my-2 singleChat">
        <div className="d-flex align-items-center ml-3 my-2">
          <div className="align-items-center justify-content-center img-container">
            <img
              src={
                props.chatInfo.messages.length > 0
                  ? props.chatInfo.messages[props.chatInfo.messages.length - 1]
                      .sender.avatar
                  : ""
              }
              alt="avatar"
            />
          </div>
          <div id="rightSChat">
            <div className="d-flex flex-grow-1 ml-3 align-items-center msg">
              <div className="flex-grow-1 my-3">
                <p className="mb-0"></p>
                <span id="nameSChat">
                  {props.chatInfo.messages.length > 0
                    ? props.chatInfo.messages[
                        props.chatInfo.messages.length - 1
                      ].sender.name
                    : "name"}
                </span>
              </div>
              <span className="mr-3">
                {props.chatInfo.messages.length > 0
                  ? props.chatInfo.messages[props.chatInfo.messages.length - 1]
                      .content.text
                  : "text"}
              </span>
            </div>
            <div id="time">
              <span>
                {props.chatInfo.messages.length > 0
                  ? props.chatInfo.messages[props.chatInfo.messages.length - 1]
                      .timestamp
                  : "Today"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewChat;
