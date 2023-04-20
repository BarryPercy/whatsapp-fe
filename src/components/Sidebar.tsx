import { useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import "../css/Sidebar.css";
import Profile from "./Profile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Chat, whatsAppState } from "../redux/interfaces/index";
import { setChats } from "../redux/actions";
import NewChat from "./NewChat";
import CreateChat from "./CreateChat";
function Sidebar() {
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")!.toString()
  );
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setChats(accessToken));
  }, [accessToken]);
  const allChats =
    useAppSelector((state) => state.whatsApp as whatsAppState)?.chats?.list ||
    [];
  const theUser = useAppSelector((state) => state.whatsApp as whatsAppState);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Container className="sidebar">
        <Container>
          <Row>
            <div id="sideAvatar">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
                onClick={handleClick} // update the click handler
              ></i>
            </div>
            <div id="sideOthers">
              <i className="bi bi-people-fill"></i>
              <i className="bi bi-emoji-smile"></i>
              <i
                className="bi bi-chat-left-text-fill"
                onClick={handleClick}
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
          {allChats && allChats.length > 0 ? (
            allChats.map((chat: Chat, index: number) => {
              return <NewChat key={index} chatInfo={chat} />;
            })
          ) : (
            <div id="nochat">No chats found!</div>
          )}
        </Container>
      </Container>
      <Profile userInfo={theUser} show={show} onHide={handleClose} />
      <CreateChat show={show} onHide={handleClose} />
    </>
  );
}

export default Sidebar;
