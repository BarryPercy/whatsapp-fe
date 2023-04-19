
import { AppThunk } from '../../types'; //needed correct typing for running actions with dispatch
import { User, Message, UserRegistration, UserLogin } from "../interfaces"
import axios from 'axios';




export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";


export const setUserInfo = (accessToken: string): AppThunk => async (dispatch) => {

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (response.ok){
      const user = await response.json();
      console.log(user)
      dispatch({
        type: SET_USER_INFO,
        payload: user
      })
    }
  } catch (error){
    console.log(error)
  }
}


export const registrationUser = (data: UserRegistration): any => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/users/account`, data)
   
      dispatch({
        type: "SET_USER_INFO",
        payload: response.data.user
      })
   localStorage.setItem("token", response.data.token)

  } catch (error){
    console.log(error)
  }
}

export const loginUser = (data: UserLogin): any => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/users/session`, data)
   
      dispatch({
        type: "SET_USER_INFO",
        payload: response.data.user
      })
   localStorage.setItem("token", response.data.token)

  } catch (error){
    console.log(error)
  }
}

export const setChats = (): AppThunk => async (dispatch) => {
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

