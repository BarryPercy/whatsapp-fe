import { useEffect, useState } from "react";
import { Card, Container, Modal, Row } from "react-bootstrap";
import "../css/Sidebar.css";
import Profile from "./Profile";
import { setChats } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import whatsAppReducer from "../redux/reducers/whatsAppReducer";
type SidebarProps = {
  show: boolean;
};
function Sidebar({ show }: SidebarProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSideBar] = useState(show);
  const handleClose = () => setShowSideBar(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setChats());
  }, [dispatch]);

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
        </Container>
      </Container>
      <Profile show={showProfile} onHide={handleProfileClose} />
    </>
  );
}

export default Sidebar;
