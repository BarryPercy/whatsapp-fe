import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import "../css/Sidebar.css";
import { useAppSelector } from "../redux/hooks/index";
import { whatsAppState } from "../redux/interfaces";

function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const chats = useAppSelector(
    (state) => (state.whatsApp as whatsAppState).chats.list
  );

  return (
    <>
      <button onClick={toggleShow}></button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        backdrop={false}
      >
        <Modal.Body>
          <Modal.Title>
            <div id="sideAvatar">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
              ></i>
            </div>
            <div id="sideOthers">
              <i className="bi bi-people-fill"></i>
              <i className="bi bi-emoji-smile"></i>
              <i className="bi bi-chat-left-text-fill"></i>
              <i className="bi bi-three-dots-vertical"></i>
            </div>
          </Modal.Title>
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
          {chats.map((chat) => (
            <h1 key={chat._id}>
              {chat.members[0].name}
              {chat.messages[0].content.text}
            </h1>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
