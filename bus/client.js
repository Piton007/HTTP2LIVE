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

    pullAll(){
        const msg = []
        for (const id in this._chats) {
            msg.push(this._chats[id].pull())
        }
        return msg
    }

}

module.exports = {
    Client
}