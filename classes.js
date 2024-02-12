class WoodTree{
    constructor({position,type}){
        this.position = position
        this.type = type
        this.active = true

        this.imageTop = new Image()
        this.imageBottom = new Image()
        if(this.type == 'normal'){
            this.imageTop.src = "images/Trees/treeTop.png"
            this.imageBottom.src = "images/Trees/treeBase.png"
        }
        else if(this.type == 'withered'){
            this.imageTop.src = "images/Trees/witheredTreeTop.png"
            this.imageBottom.src = "images/Trees/witheredTreeBase.png"
        }
        blocks.push(new Block({position:{x:this.position.x+50,y:this.position.y+245}}))

        this.detectionObject = {
            position : {x:this.position.x+44,y:this.position.y+239},
            width : 72,
            height : 72
        }

    }
    drawTop(){
        if(this.active){
            c.drawImage(this.imageTop,this.position.x,this.position.y)
            //c.fillStyle= 'red'
            //c.fillRect(this.position.x+38,this.position.y+233,72,72)
        }
        
    }
    drawBottom(){
        c.drawImage(this.imageBottom,this.position.x,this.position.y)
        if(this.active){
            this.chopWood()
            this.woodText()
        }
    }

    chopWood(){
        this.detectionObject.position.x = this.position.x+38
        this.detectionObject.position.y = this.position.y+233
        if(detectCollision({
            object1:player,
            object2:this.detectionObject
          })&&keyE&&player.equiped==='axe'){
            console.log('colidetree')
          }
          else{
            //console.log(this.detectionObject.position.x,this.detectionObject.position.y,this.detectionObject.width,this.detectionObject.height)
            //console.log(player.x,player.y)
          }
    }
    woodText(){
        this.detectionObject.position.x = this.position.x+38
        this.detectionObject.position.y = this.position.y+233
        if(detectCollision({
            object1:player,
            object2:this.detectionObject
          })&&keyE&&!messageCooldown){
            //messageFunction({message1:'Te drzewo mozna sciac...'})
            message({message1:'Te drzewo mozna sciac...'})


          }
          else{
            //console.log(this.detectionObject.position.x,this.detectionObject.position.y,this.detectionObject.width,this.detectionObject.height)
            //console.log(player.x,player.y)
          }
    }
}

function message({message1}){
    text1 = message1
    messageOn = true
    setTimeout (()=>{
        messageCount = 0
     },1000)
}

function messageOnCanvas(){
    if(messageOn){
        stopAll = true
        resetDirectionsButtons();
        //c.fillStyle = 'white'
        //c.fillRect(0,600,1224,200)
        c.drawImage(textBox,0,575,1224,200)
        c.fillStyle = 'black'
        c.font = "48px serif";
        c.fillText(text1, 100, 660);
  
        if(messageCount==0){
          setTimeout (()=>{
            messageCount = 1
          },1000)
        }
        else if(messageCount==1&&keyE){
          messageOn = false
          stopAll = false
        }
        console.log(messageCount,text1)
      }
}

function resetDirectionsButtons(){
  keyW = false;
  keyA = false;
  keyS = false;
  keyD = false;
}
