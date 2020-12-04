class Broker {
   constructor(name,children){
        this.name = name
        this.children = children
   } 

   addChild(child){
       this.children.push(child)
   }
}

module.exports  = {
    Broker
}