const {Broker} = require("./broker")

class User extends Broker{
    constructor(connectionId,name,children){
        super(name,children)
        this.connectionId = connectionId

    }

    join(roomId){
        this.roomsIds.push(roomId) 
    }

   
} 
module.exports = {
    User
}