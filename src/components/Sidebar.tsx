import React, { useState } from "react";
import { Card, DropdownButton, Modal, Row } from "react-bootstrap";
import "../css/Sidebar.css";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
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
          [mapEveryChat adding a row] eg
          <Row>[Hi]</Row>
          <Row>[Hi]</Row>
          <Row>[Hi]</Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
