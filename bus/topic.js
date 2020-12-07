const {v4} = require("uuid")
const {Queue} = require("./queue")

class Topic {

    static create(){
        return v4().then((name)=>{
            return new Topic(name)
        })
    }

    constructor(name){
        this.name = name
        this.queue = {}
    }

    addQueue(id){
        const chat = Queue.create(id,this.name)
        this.queue[id] = chat
    }

    removeQueue(id){
        delete this.queue[id]
    }

    dispatch(msg){
        for (const k in this.queue) {
            this.queue[k].dispatch(msg) 
        }
    
    }

    getQueue(id){
        return this.queue[id]
    }

   
} 
module.exports = {
    Topic
}