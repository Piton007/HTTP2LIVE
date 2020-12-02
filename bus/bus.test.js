const {EventBus} = require("./bus")
const {v4} = require("uuid")



describe('Bus Tests',()=>{
    
    beforeAll(function(){
        const now = new Date()
        Date = jest.fn(function(){
            return now
        })

        v4.mockResolvedValue('new_room')
    })
    
    
    test('Given bus is available When user needs to create new room  Then bus should create the room And return its uuid',function(){
        const expected = 'new_room'
        const bus = new EventBus()
        return bus.createRoom().then(function(id){
            expect(id).toBe(expected)        
            
        })
    })
    
    
    test('Given room X is available When user needs to use room X Then bus should return the room X',function(){
        
        const bus = new EventBus()
        return bus.createRoom().then(function(id){
            expect(bus.to(id)).toBeDefined()      
            
        })
       
        

    })
    
    afterAll(()=>{
        jest.restoreAllMocks()
    })
})
