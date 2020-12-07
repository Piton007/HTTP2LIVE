const { Topic } = require("topic");
const { v4 } = require("uuid");
const { Message } = require("payload");

describe("Topic tests", () => {
	beforeAll(function () {
		const now = new Date();
		Date = jest.fn(function () {
			return now;
		});
		v4.mockResolvedValue("New_Topic");
	});

	test("Given topic X is available When new msg has arrived Then Topic should dispatch the msg to all queues", () => { 
        return Topic.create().then((topic)=>{
            topic.addQueue('user_1')
            topic.addQueue('user_2')
            const user1 = topic.getQueue('user_1')
            const user2 = topic.getQueue('user_2')
            const expected = {user1:1,user2:1}
            
            topic.dispatch(fakeData.msg())
            
            const result = {user1:user1.length,user2:user2.length}
            
            expect(result).toEqual(expected)
        })
	});
});
const fakeData = {
	msg: () =>
		new Message(
			"ElPepe",
			"Hi There . My name is ElPepe, I'm from Neverland xd"
		),
	SSEMsg: (event, date, data) =>
		`event:${event}\ndate: ${date.toLocaleDateString()}\ndata:${JSON.stringify(
			data
		)}\n\n`,
};
