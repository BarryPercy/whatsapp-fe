import { Modal } from "react-bootstrap";

type ProfileProps = {
  show: boolean;
  onHide: () => void;
};

function Profile({ show, onHide }: ProfileProps) {
  return (
    <>
      <Modal show={show} backdrop={false} id="profileModal">
        <Modal.Body>
          <Modal.Title>
            <i className="bi bi-arrow-left" onClick={onHide}></i>
            <span>Profile</span>
          </Modal.Title>
          <Modal.Dialog></Modal.Dialog>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
