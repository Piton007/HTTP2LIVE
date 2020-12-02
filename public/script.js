window.onload = function(){
    var evtSource = new EventSource("/live");
    const cont = document.querySelector(".count")
    evtSource.onmessage = function(event){
        cont.textContent = ev.data
    }

    evtSource.addEventListener('custom',function(ev){
        
        cont.textContent = ev.data
    })
   
    evtSource.onopen = function(eve){
        console.log('hey')
    }
}
