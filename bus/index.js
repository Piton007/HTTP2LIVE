const {v4} = require("uuid")
const {Broker} = require("./broker")

class EventBus{
    constructor(interval){
        this.dispatchInterval = interval || 1500
        this.rooms = {}
    }

    createRoom(){
        let self = this
        return v4().then((id)=>{
            self.rooms[id] = new Broker(id)
            return id
        })
    }
    to(room){
        return this.rooms[room]
    }

}


module.exports = EventBus
module.exports.instance = new EventBus()