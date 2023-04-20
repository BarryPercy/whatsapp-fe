import { AppThunk } from "../../types"; //needed correct typing for running actions with dispatch
import { User, Message, whatsAppState } from "../interfaces";

export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const SET_USER_AVATAR = "SET_USER_AVATAR";
export const GET_USERS_INFO = "GET_USERS_INFO";

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
        console.log(user);
        dispatch({
          type: SET_USER_INFO,
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
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    try {
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
  (id: string, accessToken: string): AppThunk =>
  async (dispatch) => {
    try {
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
        dispatch({
          type: "SET_HISTORY",
          payload: {
            chatId: id,
            history: res.messages,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const newMessage =
  (message: Message, users: User[]): AppThunk =>
  async (dispatch) => {
    try {
      const sendObject = {
        message,
        users,
      };
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats}`, {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {
          "Content-Type": "application/json",
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
        dispatch({
          type: "SET_ACTIVE_CHAT",
          payload: {
            chatId: res.chatId,
          },
        });
      } else if (response.status === 201) {
        const res = await response.json();
        dispatch({
          type: "NEW_MESSAGE",
          payload: {
            chatId: res.chatId,
            message: message,
            members: users,
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
      console.log(localStorage.getItem("accessToken"));
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
        console.log(user);
        dispatch({
          type: SET_USER_AVATAR,
          payload: user.avatar,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
