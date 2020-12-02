const {Broker,Payload} = require("./broker")
const {v4} = require("uuid")


describe('Dispatch Tests',()=>{
    beforeAll(function(){
        const now = new Date()
        Date = jest.fn(function(){
            return now
        }) 
        v4.mockResolvedValue('new_id')
    })
    
    
    test('Given event X queue is  available When event X arrived Then broker should append the event into queue X And returns an uuid',function(){
        const {event,data} = {event:'event1',data:'Test event'}
        const broker = new Broker()
        const payload = new Payload(event,data,'new_id',new Date())
        return broker.dispatch(event,data).then(function(id){
            expect(id).toBe('new_id')        
            expect(broker.events[event].pop()).toStrictEqual(payload)
        })
    })
    
    
    test('Given event X queue is unavailable When event X arrived Then broker should  create queue X  with the event payload',function(){
        const {event,data} = {event:'event1',data:'Test event'}
        const broker = new Broker()
        const payload = new Payload(event,data,'new_id',new Date())
        
        return broker.dispatch(event,data).then(function(id){
            expect(broker.events[event]).toBeDefined()        
            expect(broker.events[event].pop()).toStrictEqual(payload)
        })
    })
    
    afterAll(()=>{
        jest.restoreAllMocks()
    })
})

describe('Pull Tests',()=>{
    beforeAll(function(){
        const now = new Date()
        Date = jest.fn(function(){
            return now
        }) 
        v4.mockResolvedValue('new_id')
    })
    
    
    test('Given event X queue  is available When event X arrived Then broker should pop the  last event in SSE Fomart',function(){
        const {event,data} = {event:'event1',data:'Test event'}
        const broker = new Broker()
        const payload = new Payload(event,data,'new_id',new Date())
        const expected = payload.toString()
        
        return broker.dispatch(event,data).then(function(id){
            expect(broker.pull('event1')).toEqual(expected)
        })
    })

    test('Given event X queue is  unavailable When user requires an event X Then broker should return null',function(){
        const {event} = {event:'event1'}
        const broker = new Broker()
        expect(broker.pull(event)).toEqual(null)
    })
    test('Given event X queue is  available and empty When user requires an event X Then broker should return null',function(){
        const {event} = {event:'event1'}
        const broker = new Broker()

        broker.events[event] = []
        
        expect(broker.pull(event)).toEqual(null)
    })
    
 
    
    afterAll(()=>{
        jest.resetAllMocks()
    })
})

