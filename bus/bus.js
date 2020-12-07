const {User} = require("./user")
const { Topic } = require("./topic");

class EventBus {
	constructor() {
        this.users = {};
        this.chats = {}
	}

	createUser() {
		return User.create().then((user)=>{
            this.users[user.id] = user 
            return user.id
        })
    }

    getWorker(workerId){
        return this.workers[workerId]
    }

    dispatch(chatId,msg){
        if (this.chats[chatId]){
            this.chats[chatId].dispatch(msg)
        }
    }

	join(workerId, chatId) {
        return new Promise((res,rej)=>{
            if (this.chats[chatId]){
               this._join(workerId,chatId)
               res(queueId)
            }else{
                return this._createChat().then((id)=>{
                    this._join(workerId,id)                       
                    res(id)
                })
            }
        })
		
    }
    listen(userId,callback){
        const user = this.users[userId]
        if (user){
            user.chats.forEach((q)=>{
                callback(q.pull())
            })
        }
    }

   
    _createChat(){
        return Topic.create().then((topic)=>{
            this.chats[topic.id] = topic
            return topic.id
        })
    }
	_join(workerId,chatId){
        this.users[workerId].addChat(this.chats[chatId].addQueue(workerId))
    }
}

module.exports = {
	EventBus,
	instance: new EventBus(),
};
