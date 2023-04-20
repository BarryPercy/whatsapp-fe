import { useEffect } from "react";
import { getAllUsers } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Modal } from "react-bootstrap";
import "../css/CreateChat.css";
import { whatsAppState, User } from "../redux/interfaces";
import SingleUser from "./SingleUser";

type ProfileProps = {
  show: boolean;
  onHide: () => void;
};

function CreateChat({ show, onHide }: ProfileProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const allUsers = useAppSelector((state) => state.whatsApp as whatsAppState)
    .allUsers.list;
  return (
    <>
      <Modal show={show} backdrop={false} id="profileModal">
        <Modal.Body>
          <Modal.Title>
            <div id="title">
              <i className="bi bi-arrow-left" onClick={onHide}></i>
              <span>New chat</span>
            </div>
          </Modal.Title>
          <Modal.Header id="createSearch">
            <div id="sideSearch">
              <input
                type="text"
                id="chatSearch"
                placeholder="Search contacts"
              />
              <i className="bi bi-search"></i>{" "}
              <i className="bi bi-arrow-right"></i>
            </div>
          </Modal.Header>
          <Modal.Dialog>
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((user: User, index: number) => {
                return <SingleUser key={index} userInfo={user} />;
              })
            ) : (
              <div id="nochat">No chats found!</div>
            )}
          </Modal.Dialog>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CreateChat;
