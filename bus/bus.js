const {v4} = require("uuid")
const {Broker} = require("./broker")

class EventBus{
    constructor(){
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


module.exports = {
    EventBus,
    instance:new EventBus()
}
