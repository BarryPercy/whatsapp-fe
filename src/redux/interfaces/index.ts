import { UserInfo } from "os";

export interface RootState {
    whatsApp: whatsAppState;
}

export interface whatsAppState {
    userInfo: {
        _id: string
        name: string
        email: string
        avatar?: string
    },
    chats: {
        active: string // the _id of one of the chats among store.chats.list	
        list: Chat[]
    }
}

interface Chat {
    messages: Message[];
    otherUser: User;
}

export interface setUserInfo{
    type:"SET_USER_INFO";
    payload: User;
}

export interface User {
    _id: string
    name: string
    email: string
    avatar?: string
}

export interface setChats {
    type:"SET_CHATS";
    payload: { 
        chats: Chat[] 
    }
}
export interface setActiveChat {
    type:"SET_ACTIVE_CHAT";
    payload: { 
        chatId: string 
    }
}
export interface setHistory {
    type:"SET_HISTORY";
    payload: { 
        chatId: string, 
        history: Message[] 
    }
}

export interface newMessage {
    type:"NEW_MESSAGE";
    payload: {
        chatId: string, 
        message: Message
    };
}

export interface Message {
    currentUser: boolean;
    message: string;
}

