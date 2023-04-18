import { AppThunk } from '../../types'; //needed correct typing for running actions with dispatch
import { User, Message } from "../interfaces"
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";

export const setUserInfo = (): AppThunk => async (dispatch) => {
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

// export const setActiveChat = (id:string): AppThunk => async (dispatch) => {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats/${id}`) //NEED TO EDIT
//     if (response.ok){
//       const chat = await response.json();
//       dispatch({
//         type: "SET_ACTIVE_CHAT",
//         payload:id
//       })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export const setHistory = (id:string): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats/${id}`) //NEED TO EDIT
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

export const newMessage = (id:string, message:Message): AppThunk => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/chats}`,//NEED TO EDIT
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ) 
    if( response.status === 200 ){
      
    } else if( response.status === 201) {
      const message = await response.json();
      dispatch({
        type: "NEW_MESSAGE",
        payload:{
          chatId:id,
          message: message
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

