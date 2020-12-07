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

    suscribe(queue){
        this._chats[queue.topic] = queue
    }

    *pullAll(){
        for (const id in this._chats) {
            yield this._chats[id].pull()
        }
    }

    getChat(id){
        return this._chats[id]
    }

}

module.exports = {
    Client
}