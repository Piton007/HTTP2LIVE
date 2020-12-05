const {EventBus} = require("bus")
const {User} = require("user")
const {Room} = require("room")
const {Payload} = require("payload")



describe('Bus Tests',()=>{
    
    beforeAll(function(){
        const now = new Date()
        Date = jest.fn(function(){
            return now
        })

        
    })
    describe('Use tests',()=>{
        test('Given bus is available When new user arrives  Then bus should create new connection And save his connection Id',function(){
            const user = mocks.user()
            User.create = jest.fn().mockResolvedValueOnce(user)
            const expected = user.id
            const bus = new EventBus()
            return bus.createUserConnection('Jose').then((id)=>{
                expect(id).toEqual(expected)
            })
        })
    })

    describe('Join to Room Tests',()=>{
        test("Given user X when user try to create a new room then bus should add new room to broker map   And return the its id",()=>{
            const user = mocks.user()
            const room = mocks.room()
            User.create = jest.fn().mockResolvedValueOnce(user)
            Room.create = jest.fn().mockResolvedValueOnce(room)
            const bus = new EventBus()
    
            return bus.createUserConnection(user.name).then((userId)=>{
                 return bus.join(room.name,userId).then((roomId)=>{
                    expect(bus.brokers).toHaveProperty(roomId)
                    expect(roomId).toEqual(room.id)
                    
                })
            })    
        })
    })

    
       
   
    
    describe("Pull msg tests",()=>{
        test('Given user is waiting for msg from room X When queue X is not empty Then bus should pop a message from queue X',function(){
            const callback = jest.fn((name)=>name)
            const user = mocks.user()
            const room = mocks.room()
            const payload = mocks.payload(room.id,'Baby te quiero uooo baby te quiero uououou')
            User.create = jest.fn().mockResolvedValueOnce(user)
            Room.create = jest.fn().mockResolvedValueOnce(room)
            Payload.build = jest.fn().mockReturnValueOnce(payload)
            const bus = new EventBus()
    
            return bus.createUserConnection(user.name).then((userId)=>{
                 return bus.join(room.name,userId).then((roomId)=>{
                    bus.to(roomId).dispatch(payload.data) 
                    bus.listen(userId,callback)
                    expect(callback.mock.calls[0][0]).toEqual(payload.toString())
    
                })
            })
           
            
    
        })
        test('Given user is waiting for msg from room X When queue X is  empty Then bus should pop an empty message from queue X',function(){
            const callback = jest.fn((name)=>name)
            const user = mocks.user()
            const room = mocks.room()
            const payload = Payload.empty(room.id)
            User.create = jest.fn().mockResolvedValueOnce(user)
            Room.create = jest.fn().mockResolvedValueOnce(room)
            const bus = new EventBus()
    
            return bus.createUserConnection(user.name).then((userId)=>{
                 return bus.join(room.name,userId).then((roomId)=>{
                    bus.listen(userId,callback)
                    expect(callback.mock.calls[0][0]).toEqual(payload.toString())
    
                })
            })
           
            
    
        })
    })
    

  
    
    afterAll(()=>{
        jest.restoreAllMocks()
    })
})




const mocks = {
    user: ()=> new User('user_id','fake_user',[]),
    room: ()=> new Room('room_id','fake_room',[]),
    payload: (roomId,msg) => new Payload(roomId,msg, new Date())
}