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
  setOtherUserInfo,
  addMessage
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
  | getUser
  | setOtherUserInfo
  | addMessage

const initialState: whatsAppState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
  },
  otherUserInfo: {
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
    user: {
      _id: "",
      name: "",
      email: "",
      avatar: "",
      status: "",
      role: "",
    },
  },
};

const whatsAppReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "OTHER_USER":
      return {
        ...state,
        otherUserInfo: action.payload,
      };
    case "GET_USER_INFO":
      return {
        ...state,
        fetchedUser: { user: action.payload },
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
    case "ADD_MESSAGE":
      const addedChatIndex = state.chats.list.findIndex(
        (chat) => chat._id === chatId
      );
      const addedUpdatedChat =  state.chats.list[addedChatIndex].messages?.push(action.payload);
      const addedUpdatedList = [
        ...state.chats.list.slice(0, addedChatIndex),
        addedUpdatedChat,
        ...state.chats.list.slice(addedChatIndex + 1),
      ];
      return{
        ...state,
        chats:{
          ...state.chats,
          list:addedUpdatedList
        }
      }
    default:
      return state;
  }
};

export default whatsAppReducer;
