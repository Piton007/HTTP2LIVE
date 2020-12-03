class Payload {
	static build(topic,data) {
		return new Payload(topic, data, new Date());
	}
	constructor(event, data,  date) {
		this.event = event;
		this.data = data;
		this.date = date;
	}
	toString() {
		return `event:${this.event}\ndate: ${this.date.toLocaleDateString()}\ndata:${JSON.stringify(this.data)}\n\n`;
	}
}

class MessageDTO{
    constructor(owner,body){
        this.owner = owner
        this.body = body
    }
}
module.exports = {
    Payload,
    Message:MessageDTO
}