const { Room } = require("room");
const {v4} = require("uuid")
const { User } = require("user");
const {Message} = require("payload")

describe("Room tests", () => {
	beforeAll(function () {
		const now = new Date()
        Date = jest.fn(function(){
            return now
        })
		v4.mockResolvedValue("new_room");
	});

	test("Given some users joined in Room When user X send msg Then room queue should contains the msg", () => {
		
		return Room.create("test", [new User("connection1")]).then((room)=>{
			const oldSize = room.queue
			.length
			const msg = fakeData.msg()
			room.dispatch(msg)
			expect(room.queue.length).toEqual(oldSize + 1)
			 
        });
	});
	test("Given Room X queue is not empty When bus requests msg Then room queue should return the oldest message in SSE Format", () => {
		
		return Room.create("test", [new User("connection1")]).then((room)=>{
			
			const msg = fakeData.msg()
			const expected = fakeData.SSEMsg('new_room',new Date(),msg)
			room.dispatch(msg)
			expect(room.pull()).toEqual(expected)
			 
        });
	});
	
});
const fakeData = {
	msg: ()=>new Message('ElPepe',"Hi There . My name is ElPepe, I'm from Neverland xd"),
	SSEMsg:(event,date,data)=> `event:${event}\ndate: ${date.toLocaleDateString()}\ndata:${JSON.stringify(data)}\n\n`
}
	