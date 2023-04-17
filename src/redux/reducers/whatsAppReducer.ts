import { whatsAppState, willDelete} from "../interfaces/index";

type Action = willDelete

const initialState: whatsAppState = {
    userInfo:{
        _id: "",
        name:"",
        email:"",
        avatar:""
    },
    chats: {
        active:"",
        list:[]
    }
}

const whatsAppReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default whatsAppReducer