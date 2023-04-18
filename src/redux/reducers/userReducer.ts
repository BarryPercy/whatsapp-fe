import { UserState, setUserInfo, setChats, setActiveChat, setHistory, newMessage } from "../interfaces/index";

type Action = setUserInfo | setChats | setActiveChat | setHistory | newMessage

const initialState: UserState = {
    user: null

}

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "SET_USER_INFO": 
        return {
          ...state,
          user: action.payload
        }

        default:
            return state
    }
}

export default userReducer