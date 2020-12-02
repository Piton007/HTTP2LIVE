const {Broker,Payload} = require("./broker")
const {v4} = require("uuid")


beforeAll(function(){
    const now = new Date()
    Date = jest.fn(function(){
        return now
    }) 
    v4.mockResolvedValue('new_id')
})


test('Given event X queue available When event X arrived Then broker should append the event into queue X And returns an uuid',function(){
    const {event,data} = {event:'event1',data:'Test event'}
    const broker = new Broker()
    const payload = new Payload(event,data,'new_id',new Date())
    
    return broker.dispatch(event,data).then(function(id){
        expect(id).toBe('new_id')        
        expect(broker.events[event].pop()).toStrictEqual(payload)
    })
})


test('Given event X queue unavailable When event X arrived Then broker should  create queue X  with the event payload',function(){
    const {event,data} = {event:'event1',data:'Test event'}
    const broker = new Broker()
    const payload = new Payload(event,data,'new_id',new Date())
    
    return broker.dispatch(event,data).then(function(id){
        expect(broker.events[event]).toBeDefined()        
        expect(broker.events[event].pop()).toStrictEqual(payload)
    })
})

afterAll(()=>{
    jest.resetAllMocks()
})