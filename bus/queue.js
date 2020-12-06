const {Payload} = require("./payload")

class Queue  {
    
    static create(id){
        return new Queue(id)
    }

    constructor(id){
        this.id = id
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

    length(){
        return this.queue.length
    }

}




module.exports = {
    Queue
}