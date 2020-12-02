const Rx = require("rxjs")
const subject = new Rx.Subject()


function observer(action){
    return {    
        next: function(v){
            action(v)
        } 
    }
}

module.exports = {
    subject,
    observer
}