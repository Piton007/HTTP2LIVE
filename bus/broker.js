const { v4 } = require("uuid");

class Broker {
    constructor(id){
        this.id = id
        this.events = {}
    }

    dispatch(event,data){
        return Payload.build(event,data).then((x)=>{
            if(this.events[event]){
                this.events[event].push(x)
            }else{
                this.events[event] = [x]
            }
            return x.id
        })
       
    }
    pull(event){
        let result = null
        if(this.events[event] && this.events[event].length > 0){
            result = this.events[event].pop().toString()
        }
        return  result
    }
}

class Payload {
	static build(topic,data) {
		return v4().then((v) => {

			return new Payload(topic, data, v, new Date());
		});
	}
	constructor(event, data, id, date) {
		this.event = event;
		this.data = data;
		this.id = id;
		this.date = date;
	}
	toString() {
		return `event:${this.event}\nid: ${
			this.id
		}\ndate: ${this.date.toLocaleDateString()}\ndata:${this.data}\n\n`;
	}
}



module.exports = {
	Payload,
	Broker
};
