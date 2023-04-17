interface Store {
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