import { io } from "socket.io-client";
import { User, Message } from "../types/index";
import { useState, useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { whatsAppState } from "../redux/interfaces";
import { addMessage } from "../redux/actions";
import "../css/Chat.css";
const ActiveChat = () => {
  //const [username, setUsername] = useState("")
  const dispatch = useAppDispatch();
  const theUser = useAppSelector(
    (state) => state.whatsApp as whatsAppState
  ).userInfo;
  const otherUser = useAppSelector(
    (state) => state.whatsApp as whatsAppState
  ).otherUserInfo;
  const chatId = useAppSelector((state) => state.whatsApp as whatsAppState)
    .chats.active;
  const chatState = useAppSelector((state) => state.whatsApp as whatsAppState)
    .chats.list;
  const [message, setMessage] = useState("");
  const username = theUser.name;
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  // const [loggedIn, setLoggedIn] = useState(false)
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const socket = io(process.env.REACT_APP_BACKEND as string, {
    transports: ["websocket"],
  });
  useEffect(() => {
    socket.emit("joinRoom", chatId);
    const history = chatState.find((chat) => chat._id === chatId);
    console.log("this chat's history", history);
    console.log("chatId", chatId);
    //setChatHistory(history)
  }, [chatId]);
  const sendMessage = () => {
    const newMessage = {
      sender: theUser,
      content: {
        text: message,
        // media:"",
      },
      timestamp: new Date().toLocaleString("en-GB"),
      _id: chatId,
    };
    console.log("theUserid", theUser);
    console.log("ottheUserid", otherUser);
    socket.emit("sendMessage", { message: newMessage });
  };
  return (
    <Container fluid>
      <Row>
        {otherUser.name} {chatId}
      </Row>
      <Row style={{ height: "95vh" }} className="my-3">
        <Col md={12} className="d-flex flex-column justify-content-between">
          <ListGroup>
            {chatHistory.map((message, index) => (
              <ListGroup.Item key={index}>
                {<strong>{message.sender} </strong>} | {message.text} at{" "}
                {message.timestamp}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <FormControl
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ActiveChat;
