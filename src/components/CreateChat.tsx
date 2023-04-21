import { useEffect, useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const allUsers = useAppSelector((state) => state.whatsApp as whatsAppState)
    .allUsers?.list;

  const [sortedUsers, setSortedUsers] = useState<{ [key: string]: User[] }>({});

  useEffect(() => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const groups: { [key: string]: User[] } = {};
    allUsers.forEach((user) => {
      let firstLetter = user.name.charAt(0).toLowerCase();
      if (!alphabet.includes(firstLetter)) {
        firstLetter = "#";
      } else {
        firstLetter = firstLetter.toUpperCase();
      }
      if (groups[firstLetter]) {
        groups[firstLetter].push(user);
      } else {
        groups[firstLetter] = [user];
      }
    });

    const sortedGroups: { [key: string]: User[] } = {};
    Object.keys(groups)
      .sort()
      .forEach((letter) => {
        groups[letter].sort((a, b) => a.name.localeCompare(b.name));
        sortedGroups[letter] = groups[letter];
      });

    setSortedUsers(sortedGroups);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [allUsers, searchValue]);
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
          <Modal.Header id="createSearch" className="mt-2">
            <div id="sideSearch">
              <input
                type="text"
                id="chatSearch"
                placeholder="Search contacts"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <i className="bi bi-search"></i>{" "}
              <i className="bi bi-arrow-right"></i>
            </div>
          </Modal.Header>
          <Modal.Dialog>
            <div className="my-2 singleChat">
              <div className="d-flex align-items-center ml-3 my-2">
                <div>
                  <img
                    src="https://res.cloudinary.com/dlfkpg7my/image/upload/v1682009247/131-1310350_user-group-man-man-icon-generic-social-media_lgfs4r.jpg"
                    alt="avatar"
                    id="singleAvatar"
                  />
                </div>
                <div style={{ color: "#fff" }}>
                  <div className="d-flex flex-grow-1 ml-3 align-items-start msg">
                    <span className="mr-3 mb-3">New group</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 singleChat">
              <div className="d-flex align-items-center ml-3 my-2">
                <div>
                  <img
                    src="https://res.cloudinary.com/dlfkpg7my/image/upload/v1682009247/images_v1dlld.png"
                    alt="avatar"
                    id="singleAvatar"
                  />
                </div>
                <div style={{ color: "#fff" }}>
                  <div className="d-flex flex-grow-1 ml-3 align-items-start msg">
                    <span className="mr-3 mb-3">New community</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 my-3" style={{ color: "#008052" }}>
              CONTACTS ON WHATSAPP
            </div>
            {searchValue
              ? filteredUsers.map((user) => (
                  <SingleUser key={user._id} userInfo={user} onHide={onHide} />
                ))
              : Object.keys(sortedUsers).map((letter) => (
                  <div key={letter} className="mt-2">
                    <h4 className="ml-4" style={{ color: "#008052" }}>
                      {letter}
                    </h4>
                    {sortedUsers[letter].map((user) => (
                      <SingleUser
                        key={user._id}
                        userInfo={user}
                        onHide={onHide}
                      />
                    ))}
                  </div>
                ))}
          </Modal.Dialog>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CreateChat;
