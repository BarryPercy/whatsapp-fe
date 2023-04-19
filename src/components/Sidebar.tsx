import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import "../css/Sidebar.css";
import Profile from "./Profile";
import { useAppSelector } from "../redux/hooks";
import { whatsAppState } from "../redux/interfaces/index";
function Sidebar() {
  const [showProfile, setShowProfile] = useState(false);

  const allChats = useAppSelector((state) => state.whatsApp as whatsAppState).chats.list
  const theUser = useAppSelector((state) => state.whatsApp as whatsAppState).userInfo
  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };
  useEffect(()=>{
    console.log(allChats)
    console.log(theUser)
  },[])

  return (
    <>
      <Container className="sidebar">
        <Container>
          <Row>
            <div id="sideAvatar">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
                onClick={handleProfileClick} // update the click handler
              ></i>
            </div>
            <div id="sideOthers">
              <i className="bi bi-people-fill"></i>
              <i className="bi bi-emoji-smile"></i>
              <i className="bi bi-chat-left-text-fill"></i>
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
          {allChats &&
            allChats.map((chat, index) => (
              <div key={index} className="historyCard">
                <div id="historyAvatar">{chat.members[index].avatar}</div>
                <div id="historyRest">
                  <h2 id="historyName">{chat.members[index].name}</h2>
                  <h3 id="historyMessage">
                    <span>
                      {chat.messages[chat.messages.length - 1].content.text}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
        </Container>
      </Container>
      <Profile show={showProfile} onHide={handleProfileClose} />
    </>
  );
}

export default Sidebar;
