import { Modal } from "react-bootstrap";
import "../css/Profile.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { User, whatsAppState } from "../redux/interfaces";
import { useState } from "react";
import { updateUserInfo, uploadUserAvatar } from "../redux/actions";
import { upload } from "@testing-library/user-event/dist/upload";

type ProfileProps = {
  show: boolean;
  onHide: () => void;
  userInfo: whatsAppState;
};

function Profile({ userInfo, show, onHide }: ProfileProps) {
  console.log(userInfo.userInfo.avatar);
  const user = useAppSelector((state) => state.whatsApp as User);
  console.log(user)
  const [name, setName] = useState(userInfo.userInfo.name);
  const [status, setStatus] = useState(userInfo.userInfo.status);
  const [nameEditMode, setNameEditMode] = useState(false);
  const [statusEditMode, setStatusEditMode] = useState(false);
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")!.toString()
  );
  const dispatch = useAppDispatch();

  function handleNameSave() {
    const updatedUser = {
      ...userInfo,
      userInfo: { ...userInfo.userInfo, name },
    };
    dispatch(updateUserInfo(accessToken, updatedUser));
    setNameEditMode(false);
  }

  function handleStatusSave() {
    const updatedUser = {
      ...userInfo,
      userInfo: { ...userInfo.userInfo, status },
    };
    dispatch(updateUserInfo(accessToken, updatedUser));
    setStatusEditMode(false);
  }


  const uploadAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) =>  {
    const file = event.target?.files?.[0]
    console.log(file)
    dispatch(uploadUserAvatar(file))
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
            <div id="profileAvatar">
              {" "}
              <img
                src={userInfo.userInfo.avatar}
                alt="avatar"
                id="pfpAvatar"
              />{" "}
              <div id="hidden">
                <label id="hiddenCam" htmlFor="uploadAvatar">
                  <i className="bi bi-camera-fill"></i>
                </label>
                <input type="file" id="uploadAvatar" hidden onChange={uploadAvatarHandler}/>
                <span id="hiddenText">CHANGE PROFILE PHOTO</span>
              </div>
            </div>
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
                      {userInfo.userInfo.name}
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
                      {userInfo.userInfo.status
                        ? userInfo.userInfo.status
                        : "I am new to WhatsApp!"}
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
