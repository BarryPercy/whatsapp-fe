import { io } from 'socket.io-client'
import { User, Message } from '../types/index'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl, ListGroup, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { whatsAppState } from '../redux/interfaces'
import { addMessage, setChats, setHistory } from '../redux/actions'
const ActiveChat = ()=>{
    //const [username, setUsername] = useState("")
    const dispatch = useAppDispatch()
    const theUser = useAppSelector((state) => state.whatsApp as whatsAppState).userInfo
    const otherUser = useAppSelector((state) => state.whatsApp as whatsAppState).otherUserInfo
    const chatId = useAppSelector((state) => state.whatsApp as whatsAppState).chats.active
    const chatState = useAppSelector((state) => state.whatsApp as whatsAppState).chats.list
    const [message, setMessage] = useState("")
    const username = theUser.name
    const [chatIndex,setChatIndex] = useState(0)
    // const [onlineUsers, setOnlineUsers] = useState<User[]>([])
    // const [loggedIn, setLoggedIn] = useState(false)
    const socket = io(process.env.REACT_APP_BACKEND as string, { transports: ['websocket'] })
    useEffect(() => {
        socket.emit("joinRoom", chatId);
        const history = chatState.find(
            (chat) => chat._id === chatId
        )
        console.log("this chat's history", history)
        socket.on("newMessage", message=>{
            dispatch(setChats())
        } )
        console.log("state",chatState)
        const currentChat = chatState.findIndex(chat => chat._id === chatId);
        setChatIndex(currentChat)
        console.log("currentchat",chatState[currentChat])
      }, [chatState])
    const sendMessage = () => {
        const newMessage = {
            sender: theUser,
            content:{
                text:message,
                // media:"",
            },
            _id:chatId
        }
        socket.emit("sendMessage", { message: newMessage })
    }
    return(
        <Container fluid>
            <Row>
                {otherUser.name}
            </Row>
            <Row style={{ height: "95vh" }} className="my-3">
                <Col md={12} className="d-flex flex-column justify-content-between">
                    <ListGroup>
                        {chatState[chatIndex] && chatState[chatIndex].messages
                            ?(chatState[chatIndex].messages.map((message, index) => 
                            (<ListGroup.Item key={index}>
                                {<strong>{message.sender.name} </strong>} | {message.content.text} at {message.createdAt?.toString()}
                                </ListGroup.Item>)
                                ))
                                :""
                        }
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