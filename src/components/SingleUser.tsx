import { User } from "../redux/interfaces";
import "../css/NewChat.css";
import "../css/SingleUser.css";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { whatsAppState } from "../redux/interfaces";
import { OTHER_USER, newMessage } from "../redux/actions";

interface IProps {
  userInfo: User;
  onHide: () => void;
}

function SingleUser(props: IProps) {
  const dispatch = useAppDispatch();
  const theUser = useAppSelector(
    (state) => state.whatsApp as whatsAppState
  ).userInfo;
  const handleClick = () => {
    props.onHide();
    dispatch({
      type: OTHER_USER,
      payload: props.userInfo,
    });
    dispatch(newMessage(props.userInfo, theUser));
  };
  return (
    <>
      <div className="my-2 singleChat" onClick={handleClick}>
        <div className="d-flex align-items-center ml-3 my-2">
          <div className="align-items-center justify-content-center img-container">
            <img
              src={props.userInfo.avatar !== "" ? props.userInfo.avatar : ""}
              alt="avatar"
              id="singleAvatar"
            />
          </div>
          <div id="rightSChat">
            <div className="d-flex flex-grow-1 ml-3 align-items-start msg">
              <div className="flex-grow-1 my-3">
                <p className="mb-0"></p>
                <span id="nameSChat">
                  {props.userInfo.name !== "" ? props.userInfo.name : "name"}
                </span>
              </div>
              <span className="mr-3 status">
                {props.userInfo.status !== undefined
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
