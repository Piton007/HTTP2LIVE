const {v4} = require("uuid")
const {Payload} = require("./payload")
const {Broker} = require("./broker")

class Room extends Broker {
    
    static create(name,clients){
        return v4().then((id)=>{
            return new Room(id,name,clients)
        })
    }
    constructor(id,name,clients){
        super(name,clients)
        this.id = id
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