const {v4} = require("uuid")
const {Payload} = require("./payload")

class Room {
    
    static create(name,clients){
        return v4().then((id)=>{
            return new Room(id,name,clients)
        })
    }
    constructor(id,name,clients){
        this.id = id
        this.name = name
        this.clients = clients
        this.queue = []
    }

    dispatch(msg){
        this.queue.push(Payload.build(this.id,msg))
    }

    pull(){
        return this.queue.pop().toString()
    }

}




module.exports = {
    Room
}