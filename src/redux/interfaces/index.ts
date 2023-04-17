export interface RootState {
    whatsApp: whatsAppState;
}

export interface whatsAppState {
    userInfo: {
        _id: string
        name: string
        email: string
        avatar?: string
    },
    chats: {
        active: string // the _id of one of the chats among store.chats.list	
        list: Chat[]
    }
}

interface Chat {

}

export interface willDelete{
    type:"WILL_DELETE";
    payload: string;
}