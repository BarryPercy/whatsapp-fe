import { UserInfo } from "os";

export interface RootState {
  whatsApp: whatsAppState;
}

export interface whatsAppState {
  userInfo: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
  };
  otherUserInfo: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
  };
  allUsers: {
    list: User[];
  };
  chats: {
    active: string; // the _id of one of the chats among store.chats.list
    list: Chat[];
  };
  fetchedUser: {
    user: User[];
  };
}

export interface UserState {
  user: User | null;
}

export interface Chat {
  _id: string;
  members: User[];
  messages?: Message[];
}

export interface setUserInfo {
  type: "SET_USER_INFO";
  payload: User;
}
export interface setOtherUserInfo {
  type: "OTHER_USER";
  payload: User;
}

export interface setUserAvatar {
  type: "SET_USER_AVATAR";
  payload: string;
}
export interface updateUserInfo {
  type: "UPDATE_USER_INFO";
  payload: User;
}
export interface getUser {
  type: "GET_USER_INFO";
  payload: User[];
}
export interface getUsers {
  type: "GET_USERS_INFO";
  payload: {
    users: User[];
  };
}

export interface Message {
  _id: string;
  sender: User;
  content: {
    text?: string;
    media?: string;
  };
  timestamp: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  status?: string;
}

export interface setChats {
  type: "SET_CHATS";
  payload: {
    chats: Chat[];
  };
}
export interface setActiveChat {
  type: "SET_ACTIVE_CHAT";
  payload: {
    chatId: string;
  };
}
export interface setHistory {
  type: "SET_HISTORY";
  payload: {
    chatId: string;
    history: Message[];
  };
}

export interface newMessage {
  type: "NEW_MESSAGE";
  payload: {
    chatId: string;
    message: Message;
    members: User[];
  };
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface addMessage{
  type: "ADD_MESSAGE";
  payload: Message;
}