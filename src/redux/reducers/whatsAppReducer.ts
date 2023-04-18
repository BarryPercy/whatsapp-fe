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
                chats:{...state.chats, list:action.payload}
            }
        case 'SET_ACTIVE_CHAT':
            return{
                ...state,
                chats:{...state.chats, active:action.payload}
            }
        case 'SET_HISTORY':
            const chatId = action.payload.chatId;
            const history = action.payload.history;
            const chatIndex = state.chats.list.findIndex((chat) => chat._id === chatId);
            const updatedChat = { ...state.chats.list[chatIndex], history };
            const updatedList = [...state.chats.list.slice(0, chatIndex), updatedChat, ...state.chats.list.slice(chatIndex + 1)];
            return {
                ...state,
                chats: { ...state.chats, list: updatedList },
            };
        case 'NEW_MESSAGE':
            
        default:
            return state
    }
}

export default whatsAppReducer