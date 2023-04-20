import { Chat } from "../redux/interfaces";
import "../css/NewChat.css";

interface IProps {
  chatInfo: Chat;
}

function NewChat(props: IProps) {
<<<<<<< Updated upstream
=======
  const recipientId =
    props.chatInfo.members[props.chatInfo.members.length - 1]._id;
  const currentUserId = useAppSelector(
    (state) => (state.whatsApp as whatsAppState).userInfo._id
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (recipientId !== currentUserId) {
      dispatch(getUser(recipientId));
    }
  }, [currentUserId, recipientId]);
  const recipient = useAppSelector(
    (state) => (state.whatsApp as whatsAppState).fetchedUser.user
  );
  console.log(recipient.name);

>>>>>>> Stashed changes
  return (
    <>
      <div className="my-2 singleChat">
        <div className="d-flex align-items-center ml-3 my-2">
          <div className="align-items-center justify-content-center img-container">
            <img
<<<<<<< Updated upstream
              src={
                props.chatInfo.messages.length > 0
                  ? props.chatInfo.messages[props.chatInfo.messages.length - 1]
                      .sender.avatar
                  : ""
              }
=======
              src={props.chatInfo.members.length > 0 ? recipient.avatar : ""}
>>>>>>> Stashed changes
              alt="avatar"
            />
          </div>
          <div id="rightSChat">
            <div className="d-flex flex-grow-1 ml-3 align-items-center msg">
              <div className="flex-grow-1 my-3">
                <p className="mb-0"></p>
                <span id="nameSChat">
<<<<<<< Updated upstream
                  {props.chatInfo.messages.length > 0
                    ? props.chatInfo.messages[
                        props.chatInfo.messages.length - 1
                      ].sender.name
                    : "name"}
=======
                  {props.chatInfo.members.length > 0 ? recipient.name : "name"}
>>>>>>> Stashed changes
                </span>
              </div>
              <span className="mr-3">
                {props.chatInfo.members.length > 0
                  ? recipient.status
                  : "Hi there! I am using WhatsApp."}
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
