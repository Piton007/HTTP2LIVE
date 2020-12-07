const {EventBus} = require("bus")
const {Client} = require("client")
const {Topic} = require("topic")
const {Message} = require("payload")



describe('Bus Tests',()=>{
    
    beforeAll(function(){
        const now = new Date()
        Date = jest.fn(function(){
            return now
        })

        
    })
    describe('Use tests',()=>{
        test('Given bus is available When new user arrives  Then bus should create new connection And save his connection Id',function(){
            const user = mocks.client(2)
            Client.create = jest.fn().mockResolvedValueOnce(user)
            const expected = user.id
            const bus = new EventBus()
            return bus.createUser().then((id)=>{
                expect(id).toEqual(expected)
            })
        })
    })

    describe('Join to Room Tests',()=>{
        test("Given user X when user wants to create a new chat then bus should add new chat to topics And return its id",()=>{
            const client = mocks.client('userid')
            const chat = mocks.topic('hello')
            Client.create = jest.fn().mockResolvedValueOnce(client)
            Topic.create = jest.fn().mockResolvedValueOnce(chat)
            const bus = new EventBus()
    
            return bus.createUser().then((userId)=>{
               
                 return bus.join(userId,chat.name).then((chatId)=>{
                     
                    expect(bus.chats).toHaveProperty(chatId)
                    expect(bus.clients[userId].getChat(chatId)).toEqual(bus.chats[chatId].getQueue(userId))
                    
                })
            })    
        })
    })

    
       
   
    
    describe("Pull msg tests",()=>{
        test('Given user suscribed to Y topics When user is waiting all topic msgs Then bus should execute callbacks Y times',function(){
            const callback = jest.fn()
            const client = mocks.client()
            const chat = mocks.topic()
            Client.create = jest.fn().mockResolvedValueOnce(client)
            Topic.create = jest.fn().mockResolvedValueOnce(chat)
          
            const bus = new EventBus()
    
            return bus.createUser().then((userId)=>{
                 return bus.join(userId,chat.name).then((chatId)=>{
                    bus.dispatch(chatId,mocks.msg()) 
                    bus.listen(userId,callback)
                    expect(callback.mock.calls.length).toEqual(1)
    
                })
            })
           
            
    
        })
    })

    describe("Dispatch msg tests",()=>{
        test('Given user suscribed to Topic Y When user send msg to Topic Y Then bus should dispatch the msg to Topic Y',function(){
            const client = mocks.client()
            const chat = mocks.topic()
            chat.dispatch = jest.fn()
            Client.create = jest.fn().mockResolvedValueOnce(client)
            Topic.create = jest.fn().mockResolvedValueOnce(chat)
          
            const bus = new EventBus()
    
            return bus.createUser().then((userId)=>{
                 return bus.join(userId,chat.name).then((chatId)=>{
                    bus.dispatch(chatId,mocks.msg()) 
                    
                    expect(chat.dispatch.mock.calls[0][0]).toEqual(mocks.msg())
    
                })
            })
           
            
    
        })
    })
    

  
    
    afterAll(()=>{
        jest.restoreAllMocks()
    })
})




const mocks = {
    msg: () =>
		new Message(
			"ElPepe",
			"Hi There . My name is ElPepe, I'm from Neverland xd"
		),
    client: (id)=> new Client(id),
    topic: (name)=> new Topic(name)
}