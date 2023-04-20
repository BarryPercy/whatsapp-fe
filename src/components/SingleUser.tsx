import { User } from "../redux/interfaces";
import "../css/NewChat.css";

interface IProps {
  userInfo: User;
}

function SingleUser(props: IProps) {
  return (
    <>
      <div className="my-2 singleChat">
        <div className="d-flex align-items-center ml-3 my-2">
          <div className="align-items-center justify-content-center img-container">
            <img
              src={props.userInfo.avatar !== "" ? props.userInfo.avatar : ""}
              alt="avatar"
            />
          </div>
          <div id="rightSChat">
            <div className="d-flex flex-grow-1 ml-3 align-items-center msg">
              <div className="flex-grow-1 my-3">
                <p className="mb-0"></p>
                <span id="nameSChat">
                  {props.userInfo.name !== "" ? props.userInfo.name : "name"}
                </span>
              </div>
              <span className="mr-3">
                {props.userInfo.status !== ""
                  ? props.userInfo.status
                  : "Hey there! I am using WhatsApp."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleUser;
