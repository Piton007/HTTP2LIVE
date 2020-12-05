const {Broker} = require("./broker")
const {v4} = require("uuid")

class User extends Broker{

    static create(name,children){
        return v4().then((id)=>{
            return new User(id,name,children)
        })
    }

    constructor(connectionId,name,children){
        super(connectionId,name,children)
    }


   
} 
module.exports = {
    User
}