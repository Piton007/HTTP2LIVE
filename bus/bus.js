const {Client} = require("./client")
const { Topic } = require("./topic");

class EventBus {
	constructor() {
        this.clients = {};
        this.chats = {}
	}

	createUser() {
		return Client.create().then((client)=>{
            this.clients[client.id] = client 
            return client.id
        })
    }

   

    dispatch(chatId,msg){
        if (this.chats[chatId]){
            this.chats[chatId].dispatch(msg)
        }
    }

	join(clientId, chatId) {
        return new Promise((res,rej)=>{
            if (this.chats[chatId]){
               this._join(clientId,chatId)
               res(chatId)
            }else{
                return this._createChat().then((id)=>{
                 
                    this._join(clientId,id)                       
                    res(id)
                })
            }
        })
		
    }
    listen(userId,callback){
        const user = this.clients[userId]
        if (user){
            for (const msg of user.pullAll()) {
                callback(msg)
            }
        }
    }

   
    _createChat(){
        return Topic.create().then((topic)=>{
            this.chats[topic.name] = topic
            return topic.name
        })
    }
	_join(clientId,chatId){
        this.chats[chatId].addQueue(clientId)
        const queue = this.chats[chatId].getQueue(clientId)
        this.clients[clientId].suscribe(queue)
    }
}

module.exports = {
	EventBus,
	instance: new EventBus(),
};
