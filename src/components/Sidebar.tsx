import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import "../css/Sidebar.css";
import Profile from "./Profile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Chat, whatsAppState } from "../redux/interfaces/index";
import { setChats, setUserInfo } from "../redux/actions";
import NewChat from "./NewChat";
import CreateChat from "./CreateChat";

function Sidebar() {
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")!.toString()
  );
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChats());
    dispatch(setUserInfo(accessToken));
  }, [accessToken, dispatch]);

  const allChats =
    useAppSelector(
      (state: { whatsApp: whatsAppState }) => state.whatsApp.chats.list
    ) || [];
  const theUser = useAppSelector(
    (state: { whatsApp: whatsAppState }) => state.whatsApp
  );
  localStorage.setItem("userId", theUser.userInfo._id);

  const handleNewChatClick = () => {
    setShowNewChat(true);
  };

  const handleNewChatClose = () => {
    setShowNewChat(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Container className="sidebar">
        <Container>
          <Row className="ml-0">
            <div id="sideAvatar">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
                onClick={handleProfileClick}
              ></i>
            </div>
            <div id="sideOthers">
              <i className="bi bi-people-fill"></i>
              <i className="bi bi-emoji-smile"></i>
              <i
                className="bi bi-chat-left-text-fill"
                onClick={handleNewChatClick}
              ></i>
              <i className="bi bi-three-dots-vertical"></i>
            </div>
          </Row>
          <Card>
            <Card.Header>
              <div id="sideSearch">
                <input
                  type="text"
                  id="chatSearch"
                  placeholder="Search or start new chat"
                />
                <i className="bi bi-search"></i>{" "}
                <i className="bi bi-arrow-right"></i>
              </div>

              <i className="bi bi-filter"></i>
            </Card.Header>
          </Card>
          {allChats && allChats.length ? (
            allChats.map((chat: Chat) => {
              return (
                <NewChat
                  key={chat._id}
                  chatInfo={chat}
                  allUsers={theUser.allUsers.list}
                />
              );
            })
          ) : (
            <div id="nochat">No chats found!</div>
          )}
        </Container>
      </Container>
      <Profile
        userInfo={theUser}
        show={showProfile}
        onHide={handleProfileClose}
      />
      <CreateChat show={showNewChat} onHide={handleNewChatClose} />
    </>
  );
}

export default Sidebar;
