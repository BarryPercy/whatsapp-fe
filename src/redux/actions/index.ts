import { AppThunk } from "../../types"; //needed correct typing for running actions with dispatch
import { User, Message, whatsAppState } from "../interfaces";

export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const SET_USER_AVATAR = "SET_USER_AVATAR";
export const GET_USERS_INFO = "GET_USERS_INFO";
export const OTHER_USER = "OTHER_USER";
export const GET_USER_INFO = "GET_USER_INFO";
export const ADD_MESSAGE = "ADD_MESSAGE"

export const setUserInfo =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const user = await response.json();
        dispatch({
          type: SET_USER_INFO,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/${id}`
      );
      if (response.ok) {
        const user = await response.json();
        dispatch({
          type: GET_USER_INFO,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getAllUsers = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`);
    if (response.ok) {
      const users = await response.json();
      dispatch({
        type: GET_USERS_INFO,
        payload: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setChats =
  (): AppThunk =>
  async (dispatch) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken")!.toString()
      );
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        dispatch({
          type: "SET_CHATS",
          payload: res.chats,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setHistory =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      console.log(id)
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken")!.toString()
      );
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/chats/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log("dis what i got", res)
        dispatch({
          type: "SET_HISTORY",
          payload: {
            chatId: id,
            history: res,
          },
        });
      }
      else{
        console.log("meow")
      }
    } catch (error) {
      console.log(error);
    }
  };

export const newMessage =
  (recipient: User, sender: User): AppThunk =>
  async (dispatch) => {
    try {
      const sendObject = {
        // message,
        recipient: recipient._id,
      };
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken")!.toString()
      );
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats`, {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: "SET_HISTORY",
          payload: {
            chatId: res.chatId,
            history: res.messages,
          },
        });
        console.log("active")
        dispatch({
          type: "SET_ACTIVE_CHAT",
          payload: res.chatId,
        });
      } else if (response.status === 201) {
        const res = await response.json();
        dispatch({
          type:"SET_ACTIVE_CHAT",
          payload:res.chatId
        })
        dispatch({
          type: "NEW_MESSAGE",
          payload: {
            chatId: res.chatId,
            members: [sender, recipient],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const updateUserInfo =
  (accessToken: string, updatedUser: whatsAppState): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/me`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser.userInfo),
        }
      );
      if (response.ok) {
        const user = await response.json();
        dispatch({
          type: SET_USER_INFO,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const uploadUserAvatar =
  (avatar: any): AppThunk =>
  async (dispatch) => {
    try {
      const data = new FormData();
      data.append("avatar", avatar);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/me/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken") || ""
            )}`,
          },
          body: data,
        }
      );
      if (response.ok) {
        const user = await response.json();
        dispatch({
          type: SET_USER_AVATAR,
          payload: user.avatar,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const addMessage = (message: Message, chatId:string): AppThunk =>
  async (dispatch) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessToken")!.toString()
      );
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/chats/addMessage`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            chatId
          }),
        }
      );
      if (response.ok) {
        const user = await response.json();
        dispatch({
          type: ADD_MESSAGE,
          payload: {message},
        });
      }
    } catch (error) {
      console.log(error);
    }
};
