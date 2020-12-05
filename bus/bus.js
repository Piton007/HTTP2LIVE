const { v4 } = require("uuid");
const { Room } = require("./room");
const { User } = require("./user");

class EventBus {
	constructor() {
		this.brokers = {};
	}

	createUserConnection(name) {
		return User.create(name,[]).then((user)=>{
            this.brokers[user.id] = user
            return user.id
        })
	}

	join(name, userConnection) {
        let self = this;
        return new Promise((res,rej)=>{
            
            const room = Object.values(this.brokers).find((x) => x.name === name);
            
            if (room) {
                self.brokers[userConnection].addChild(room.id)
                res(room.id)
               
            }else{
                Room.create(name,[userConnection]).then((r)=>{
                    self.brokers[r.id] = r  
                    self.brokers[userConnection].addChild(r.id)
                    res(r.id)
                })
            }

        })
		
    }
    listen(userConnectionId,callback){
        const user = this.brokers[userConnectionId]
        if (user){
            user.children.forEach((roomId)=>{
                callback(this.brokers[roomId].pull())
            })
        }
    }

    to(roomId){
        return this.brokers[roomId]
    }
   
	
}

module.exports = {
	EventBus,
	instance: new EventBus(),
};
