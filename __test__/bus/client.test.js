const { Client } = require("client");
const {Queue} = require("queue")
const { v4 } = require("uuid");
const { Message } = require("payload");

describe("Client tests", () => {
	beforeAll(function () {
		const now = new Date();
		Date = jest.fn(function () {
			return now;
		});
		v4.mockResolvedValue("New_Client");
	});

	test("Given User X is suscribed to Topic X When user make msg requests  Then all queues from Topic X should pop the oldest msg", () => { 
        
        
        return Client.create().then((client)=>{
            const expected = [fakeData.SSEMsg('topic1',new Date(),fakeData.msg()),fakeData.SSEMsg('topic2',new Date(),fakeData.msg())]
            const topic1 = Queue.create(client.id,'topic1')
            const topic2 = Queue.create(client.id,'topic2')
            topic1.dispatch(fakeData.msg())
            topic2.dispatch(fakeData.msg())
            client.suscribe(topic1)
            client.suscribe(topic2)

            const results = client.pullAll()
            
            expect(results).toEqual(expected)
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
