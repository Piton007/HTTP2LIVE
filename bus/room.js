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
        super(id,name,clients)
        this.queue = []
    }


    dispatch(msg){
        this.queue.push(Payload.build(this.id,msg))
    }

    pull(){
        const msg = this.queue.pop(0)
        let result = Payload.empty(this.id)
        if (msg){
            result =  msg
        }
        return result.toString()
    }

}




module.exports = {
    Room
}