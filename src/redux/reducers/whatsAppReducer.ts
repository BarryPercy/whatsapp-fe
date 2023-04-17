import { whatsAppState, setUserInfo, setChats, setActiveChat, setHistory, newMessage } from "../interfaces/index";

type Action = setUserInfo | setChats | setActiveChat | setHistory | newMessage

const initialState: whatsAppState = {
    userInfo:{
        _id: "",
        name:"",
        email:"",
        avatar:""
    },
    chats: {
        active:"",
        list:[]
    }
}

const whatsAppReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'SET_CHATS':
            return {
                ...state,
            }
        case 'SET_ACTIVE_CHAT':
            return{
                ...state,
            }
        case 'SET_HISTORY':
            return{
                ...state,
            }
        case 'NEW_MESSAGE':
            return{
                ...state,
            }
        default:
            return state
    }
}

export default whatsAppReducer