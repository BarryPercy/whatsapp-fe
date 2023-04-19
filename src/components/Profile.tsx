import { Modal } from "react-bootstrap";
import "../css/Profile.css";
import { useAppSelector } from "../redux/hooks";
import { User } from "../redux/interfaces";
import { useEffect, useState } from "react";

type ProfileProps = {
  show: boolean;
  onHide: () => void;
};

function Profile({ show, onHide }: ProfileProps) {
  const user = useAppSelector((state) => state.whatsApp as User);
  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState(user.status);
  const [nameEditMode, setNameEditMode] = useState(false);
  const [statusEditMode, setStatusEditMode] = useState(false);

  useEffect(() => {
    if (!user.name) {
      setName("Mantas");
    } else {
      setName(user.name);
    }
    if (!user.status) {
      setStatus("Hey there! I am using WhatsApp.");
    } else {
      setStatus(user.status);
    }
  }, [user]);

  function handleNameSave() {
    // save the updated name here
    setNameEditMode(false);
  }

  function handleStatusSave() {
    // save the updated status here
    setStatusEditMode(false);
  }

  return (
    <>
      <Modal show={show} backdrop={false} id="profileModal">
        <Modal.Body>
          <Modal.Title>
            <div id="title">
              <i className="bi bi-arrow-left" onClick={onHide}></i>
              <span>Profile</span>
            </div>
          </Modal.Title>
          <Modal.Header>
            <div id="profileAvatar">{user.avatar}</div>
          </Modal.Header>
          <div id="bottomPart" style={{ margin: "1rem" }}>
            <div id="nameChange">
              <span style={{ color: "#07735e" }} className="marg">
                Your name
              </span>
              <div>
                {" "}
                {nameEditMode ? (
                  <>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleNameSave} className="checkBtn">
                      <i
                        className="bi bi-check-lg"
                        style={{ color: "#c5d7cf" }}
                      ></i>
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{ color: "#c5d7cf" }}
                      id="name"
                      onClick={() => setNameEditMode(true)}
                    >
                      {" "}
                      {name}
                    </span>{" "}
                    <i
                      className="bi bi-pencil-fill"
                      style={{ color: "#8696a0" }}
                      onClick={() => setNameEditMode(true)}
                    ></i>
                  </>
                )}
                <span style={{ color: "#8696a0" }}>
                  This is not your username or pin. This name will be visible to
                  your WhatsApp contacts.
                </span>
              </div>
            </div>

            <div id="about">
              <span style={{ color: "#07735e" }}>About</span>
              <div>
                {" "}
                {statusEditMode ? (
                  <>
                    <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <button
                      onClick={handleStatusSave}
                      style={{ color: "#c5d7cf" }}
                      className="checkBtn"
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{ color: "#c5d7cf" }}
                      id="status"
                      onClick={() => setStatusEditMode(true)}
                    >
                      {status}
                    </span>{" "}
                    <i
                      className="bi bi-pencil-fill"
                      style={{ color: "#8696a0" }}
                      onClick={() => setStatusEditMode(true)}
                    ></i>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
