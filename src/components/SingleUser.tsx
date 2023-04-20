import { User } from "../redux/interfaces";
import "../css/NewChat.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { OTHER_USER, newMessage } from "../redux/actions";
import { whatsAppState } from "../redux/interfaces";
import "../css/SingleUser.css";

interface IProps {
  userInfo: User;
}

function SingleUser(props: IProps) {
  const dispatch = useAppDispatch();
  const theUser = useAppSelector(
    (state) => state.whatsApp as whatsAppState
  ).userInfo;

  const theFunction = () => {
    dispatch({
      type: OTHER_USER,
      payload: props.userInfo,
    });
    dispatch(newMessage(props.userInfo, theUser));
  };
  return (
    <div className="my-2 singleChat" onClick={theFunction}>
      <div className="d-flex align-items-center ml-3 my-2">
        <div className="align-items-center justify-content-center img-container">
          <img
            src={props.userInfo.avatar !== "" ? props.userInfo.avatar : ""}
            alt="avatar"
            id="singleAvatar"
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
  );
}
export default SingleUser;
