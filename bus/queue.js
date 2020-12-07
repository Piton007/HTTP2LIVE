const {Payload} = require("./payload")

class Queue  {
    
    static create(id,topic){
        return new Queue(id,topic)
    }

    constructor(id,topic){
        this.topic = topic || id
        this.id = id
        this.queue = []
    }


    dispatch(msg){
        this.queue.push(Payload.build(this.topic,msg))
    }

    pull(){
        const msg = this.queue.pop(0)
        let result = Payload.empty(this.topic)
        if (msg){
            result =  msg
        }
        return result.toString()
    }

    get length(){
        return this.queue.length
    }

  

}




module.exports = {
    Queue
}