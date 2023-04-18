import { AppThunk } from '../../types'; 
import { User, Message } from "../interfaces"
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const setUserInfo = (accessToken: string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/me`)
    if (response.ok){
      const user = await response.json();
      dispatch({
        type: "SET_USER_INFO",
        payload: user
      })
    }
  } catch (error){
    console.log(error)
  }
}

export const setChats = (accessToken: string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats/`)
    if (response.ok){
      const res = await response.json();
      dispatch({
        type: "SET_CHATS",
        payload:res.chats
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const setHistory = (id:string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats/${id}`) 
    if (response.ok){
      const res = await response.json();
      dispatch({
        type: "SET_HISTORY",
        payload:{
          chatId:id,
          history: res.messages
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const newMessage = (message:Message, users: User[]): AppThunk => async (dispatch) => {
  try {
    const sendObject = {
      message,
      users
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats}`,
      {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ) 
    if( response.status === 200 ){
      const res = await response.json();
      dispatch({
        type: "SET_HISTORY",
        payload:{
          chatId:res.chatId,
          history:res.messages
        }
      })
      dispatch({
        type: "SET_ACTIVE_CHAT",
        payload:{
          chatId:res.chatId,
        }
      })
    } else if( response.status === 201) {
      const res = await response.json();
      dispatch({
        type: "NEW_MESSAGE",
        payload:{
          chatId:res.chatId,
          message: message,
          members: users
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

