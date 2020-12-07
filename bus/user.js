const { v4 } = require("uuid")

class Client {

    static create(){
        return v4().then((id)=>{
            return new Client(id)
        })
    }

    constructor(id){
        this.id = id
        this._chats = {} 
    }

    suscribe(chat){
        this._chats[chat.id] = chat
    }

    pullChats(callback){
        for (const id in this._chats) {
            callback(this._chats[id].pull())
        }
    }

}

module.exports = {
    Client
}