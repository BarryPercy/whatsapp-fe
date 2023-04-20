import {
  whatsAppState,
  setUserInfo,
  setChats,
  setActiveChat,
  setHistory,
  newMessage,
  updateUserInfo,
  setUserAvatar,
  getUsers,
  getUser,
} from "../interfaces/index";

type Action =
  | setUserInfo
  | setChats
  | setActiveChat
  | setHistory
  | newMessage
  | updateUserInfo
  | setUserAvatar
  | getUsers
  | getUser;

const initialState: whatsAppState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  allUsers: {
    list: [],
  },
  chats: {
    active: "",
    list: [],
  },
  fetchedUser: {
    user: [],
  },
};

const whatsAppReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "GET_USER_INFO":
      console.log(action.payload);
      return {
        ...state,
        userInfo: { user: action.payload },
      };
    case "GET_USERS_INFO":
      return {
        ...state,
        allUsers: { ...state, list: action.payload },
      };
    case "SET_CHATS":
      return {
        ...state,
        chats: { ...state.chats, list: action.payload },
      };
    case "SET_ACTIVE_CHAT":
      return {
        ...state,
        chats: { ...state.chats, active: action.payload },
      };
    case "SET_HISTORY":
      const chatId = action.payload.chatId;
      const history = action.payload.history;
      const chatIndex = state.chats.list.findIndex(
        (chat) => chat._id === chatId
      );
      const updatedChat = { ...state.chats.list[chatIndex], history };
      const updatedList = [
        ...state.chats.list.slice(0, chatIndex),
        updatedChat,
        ...state.chats.list.slice(chatIndex + 1),
      ];
      return {
        ...state,
        chats: { ...state.chats, list: updatedList },
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        chats: {
          ...state.chats,
          list: [
            ...state.chats.list,
            {
              _id: action.payload.chatId,
              members: action.payload.members,
              messages: [action.payload.message],
            },
          ],
        },
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_USER_AVATAR":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatar: action.payload,
        },
      };
    default:
      return state;
  }
};

export default whatsAppReducer;
