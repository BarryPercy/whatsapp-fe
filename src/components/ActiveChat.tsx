import { io } from 'socket.io-client'
import { User, Message } from '../types/index'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl, ListGroup, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { whatsAppState } from '../redux/interfaces'
const ActiveChat = ()=>{
    //const [username, setUsername] = useState("")
    
    const chatId = "643efdb6dc04d1ecba940e82"
    const theUser = useAppSelector((state) => state.whatsApp as whatsAppState).userInfo
    const [message, setMessage] = useState("")
    const username = theUser.name
    const [onlineUsers, setOnlineUsers] = useState<User[]>([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [chatHistory, setChatHistory] = useState<Message[]>([])
    const socket = io(process.env.REACT_APP_BACKEND as string, { transports: ['websocket'] })
    useEffect(() => {
        socket.on("welcome", welcomeMessage => {
        
        })
        socket.emit("loggedIn")
        socket.emit("joinRoom", chatId);
        
      }, [])
    const sendMessage = () => {
        const newMessage = {
            sender: username,
            text: message,
            timestamp: new Date().toLocaleString("en-GB"),
            chatId:chatId
        }
        socket.emit("sendMessage", { message: newMessage })
        setChatHistory([...chatHistory, newMessage])
    }
    return(
        <Container fluid>
            <Row style={{ height: "95vh" }} className="my-3">
                <Col md={12} className="d-flex flex-column justify-content-between">
                    <ListGroup>
                        {chatHistory.map((message, index) => (<ListGroup.Item key={index}>{<strong>{message.sender} </strong>} | {message.text} at {message.timestamp}</ListGroup.Item>))}
                    </ListGroup>
                    <Form
                        onSubmit={e => {
                        e.preventDefault()
                        sendMessage()
                        }}
                    >
                        <FormControl
                            placeholder="Write your message here"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default ActiveChat