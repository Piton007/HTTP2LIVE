class Broker {
   constructor(id,name,children){
        this.id = id
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