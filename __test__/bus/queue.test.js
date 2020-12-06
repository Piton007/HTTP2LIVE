const { Queue } = require("queue");
const { v4 } = require("uuid");
const { Message } = require("payload");

describe("Queue tests", () => {
	beforeAll(function () {
		const now = new Date();
		Date = jest.fn(function () {
			return now;
		});
		v4.mockResolvedValue("new_Queue");
	});

	test("Given some users joined in Queue When user X send msg Then Queue queue should contains the msg", () => {
		const queue = Queue.create('queueX')
		const oldSize = queue.length()
		queue.dispatch(fakeData.msg())
		expect(queue.length()).toEqual(oldSize + 1) 
	});
	test("Given Queue X queue is not empty When bus requests msg Then Queue queue should return the oldest message in SSE Format", () => {
		const queue = Queue.create('queueX')
		const msg = fakeData.msg()
		const expected = fakeData.SSEMsg("queueX", new Date(), msg);
		
		queue.dispatch(msg)

		expect(queue.pull()).toEqual(expected)
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
