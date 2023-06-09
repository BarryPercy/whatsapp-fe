import ActiveChat from "./ActiveChat"
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";

const Main = ()=>{
    return(
        <Row className="d-flex ">
            <Col>
                <Sidebar/>
            </Col>
            <Col>
                <ActiveChat/>
            </Col>
        </Row>
    )
}

export default Main;
