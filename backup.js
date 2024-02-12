const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1224
canvas.height = 776

class Block {
  static width = 48
  static height = 48
  constructor({position}){
      this.position = position
      this.width = 48
      this.height = 48
  }
  draw(){
      c.fillStyle = 'red'
      c.fillRect(this.position.x,this.position.y,this.width,this.height)
  }
}
class Grass {
static width = 48
static height = 48
constructor({position}){
    this.position = position
    this.width = 48
    this.height = 48
}
draw(){
    //c.fillStyle = 'green'
    //c.fillRect(this.position.x,this.position.y,this.width,this.height)
}
}
class SpriteSheet{
  constructor(columns,rows,imageSrc){
      
      this.columns = columns;
      this.rows = rows;
      this.image = new Image()
      this.image.src = imageSrc;
  }
}

const collisionMap = []
for(let i = 0; i < collisions.length; i += 80){
    collisionMap.push(collisions.slice(i, 80 + i))
}
const collisionGrass = []
for(let i = 0; i < grassCollision.length; i += 80){
  collisionGrass.push(grassCollision.slice(i, 80 + i))
}

const enemies = []
const blocks = []
const grassArray = []
const offset = {
    x:0,
    y:-900
}

collisionMap.forEach((row,i) => {
    row.forEach((symbol, j) => {
        if (symbol ===7921)
        blocks.push(new Block({position:{
            x: j * Block.width + offset.x,
            y: i * Block.height + offset.y
        }}))
    })
})
collisionGrass.forEach((row,i) => {
  row.forEach((symbol, j) => {
      if (symbol ===11966)
      grassArray.push(new Grass({position:{
          x: j * Grass.width + offset.x,
          y: i * Grass.height + offset.y
      }}))
  })
})

class Background{
  constructor(backgroundX,backgroundY,imageSrc){

      this.x = backgroundX
      this.y = backgroundY
      this.image = new Image()
      this.image.src = imageSrc;
  }
 draw(){
  
 }    
}
class Player{
  constructor(x,y,width,height,color,speed){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed,
      this.cameraBox = {
        position: {
          x:this.x,
          y:this.y
        },
        width:1100,
        height:650,
      }
  }

  cameraToLeft(){
    const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width

    if (cameraBoxRightSide >= canvas.width&&keyD==true){

      startingAreaBackground.x -=  7
      movables.forEach((movable)=>{
        movable.position.x -= 7
      })
      player.speed = player.speed / 2

    }
    else{
      player.speed = 7
    }
  }
  cameraToRight(){
    const cameraBoxLeftSide = this.cameraBox.position.x 

    if (cameraBoxLeftSide <= 0&&keyA==true){

      startingAreaBackground.x = startingAreaBackground.x + 7
      movables.forEach((movable)=>{
        movable.position.x += 7
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToTop(){
    const cameraBoxTopSide = this.cameraBox.position.y + this.cameraBox.height

    if (cameraBoxTopSide >= canvas.height&&keyS==true){
      //console.log('translate to right')

      startingAreaBackground.y = startingAreaBackground.y - 7
      movables.forEach((movable)=>{
        movable.position.y -= 7
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToBottom(){
    const cameraBoxBottomSide = this.cameraBox.position.y 

    if (cameraBoxBottomSide <= 0&&keyW==true){
      //console.log('translate to right')

      startingAreaBackground.y = startingAreaBackground.y + 7
      movables.forEach((movable)=>{
        movable.position.y += 7
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToTopRight(){
    const cameraBoxBottomSide = this.cameraBox.position.y 
    const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width

    if (cameraBoxBottomSide <= 0&&keyW==true||cameraBoxRightSide >= canvas.width&&keyD==true){

      startingAreaBackground.y += 7 / Math.sqrt(2)
      startingAreaBackground.x -= 7 / Math.sqrt(2)
      movables.forEach((movable)=>{
        movable.position.y += 7 / Math.sqrt(2)
        movable.position.x -= 7 / Math.sqrt(2)
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToTopLeft(){
    const cameraBoxBottomSide = this.cameraBox.position.y 
    const cameraBoxLeftSide = this.cameraBox.position.x 

    if (cameraBoxBottomSide <= 0&&keyW==true||cameraBoxLeftSide <= 0&&keyA==true){

      startingAreaBackground.y += 7 / Math.sqrt(2)
      startingAreaBackground.x += 7 / Math.sqrt(2)
      movables.forEach((movable)=>{
        movable.position.y += 7 / Math.sqrt(2)
        movable.position.x += 7 / Math.sqrt(2)
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToBottomRight(){
    const cameraBoxTopSide = this.cameraBox.position.y + this.cameraBox.height
    const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width

    if (cameraBoxTopSide >= canvas.height&&keyS==true||cameraBoxRightSide >= canvas.width&&keyD==true){

      startingAreaBackground.y -= 7 / Math.sqrt(2)
      startingAreaBackground.x -= 7 / Math.sqrt(2)
      movables.forEach((movable)=>{
        movable.position.y -= 7 / Math.sqrt(2)
        movable.position.x -= 7 / Math.sqrt(2)
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  cameraToBottomLeft(){
    const cameraBoxTopSide = this.cameraBox.position.y + this.cameraBox.height
    const cameraBoxLeftSide = this.cameraBox.position.x 

    if (cameraBoxTopSide >= canvas.height&&keyS==true||cameraBoxLeftSide <= 0&&keyA==true){

      startingAreaBackground.y -= 7 / Math.sqrt(2)
      startingAreaBackground.x += 7 / Math.sqrt(2)
      movables.forEach((movable)=>{
        movable.position.y -= 7 / Math.sqrt(2)
        movable.position.x += 7 / Math.sqrt(2)
      })
      player.speed = player.speed / 2
    }
    else{
      player.speed = 7
    }
  }
  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.x,this.y,this.width,this.height)
}

  update(){
    this.cameraBox = {
      position: {
        x:this.x - 500,
        y:this.y - 280
      },
      width:1100,
      height:650,
    }
  }
}

enemies.push(new Enemy(200,500,1,'slime','creature','random'))

const spriteSheet02 = new SpriteSheet(12,8,"images/catSprite2.png")
//const spriteSheet01 = new SpriteSheet(12,8,"images/spritePlayer.png")
const startingAreaBackground = new Background(0,-900,"images/startingAreaZoom.png")
const startingAreaBackgroundBehind = new Background(0,-900,"images/startingAreaZoomBehind.png")

let slowerFrame = 0
let totalFrames = {
    left:3,
    right:3,
    top:3,
    down:3
}
let colideGrass = {
  left:false,
  right:false,
  top:false,
  down:false
}
let srcX = 0
let srcY = 0
let currentFrame = 0

const player = new Player (canvas.width/2-48,canvas.height/2-48,40,40,'blue',7)

player.x = 500
player.y = 400

let keyW = false;
let keyA = false;
let keyS = false;
let keyD = false;

function detectCollision({object1,object2}){
  return (
    object1.x + object1.width >= object2.position.x &&
    object1.x <= object2.position.x + object2.width &&
    object1.y <= object2.position.y + object2.height &&
    object1.y + object1.height >= object2.position.y
  )
}

let movables = [...blocks,...grassArray,...enemies]

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)

    let moving = true
    if (keyW && keyD) {
      for (let i = 0 ; i < blocks.length; i++){
        const block = blocks[i]
        if(
          detectCollision({
            object1:player,
            object2:{...block, position: {
              x: block.position.x - 8 ,
              y: block.position.y + 8 
            }}
          })
        ){
          moving = false
          srcX = 0
          break
        }
      }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.right = true
            break
          }
          else{
            colideGrass.right = false
          }
        }
        if(moving){
          movingSprite = true
          player.x += player.speed / Math.sqrt(2); // Ruch na skos
          player.y -= player.speed / Math.sqrt(2);
          player.cameraToTopRight()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.right){            
            srcY = 760
          }
          else if(colideGrass.right){
            srcY = 1792
          }

        }

      } else if (keyS && keyA){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:player,
              object2:{...block, position: {
                x: block.position.x + 8 ,
                y: block.position.y - 8 
              }}
            })
          ){
            moving = false
            srcX = 0
            break
          }
        }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.left = true
            break
          }
          else{
            colideGrass.left = false
          }
        }
        if(moving){
          player.x -= player.speed / Math.sqrt(2); // Ruch na skos
          player.y += player.speed / Math.sqrt(2);
          player.cameraToBottomLeft()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.left){            
            srcY = 504
          }
          else if(colideGrass.left){
            srcY = 1536
          }
        }
      }
        else if (keyW && keyA){
          for (let i = 0 ; i < blocks.length; i++){
            const block = blocks[i]
            if(
              detectCollision({
                object1:player,
                object2:{...block, position: {
                  x: block.position.x + 8 ,
                  y: block.position.y + 8 
                }}
              })
            ){
              moving = false
              srcX = 0
              break
            }
          }
          for (let i = 0 ; i < grassArray.length; i++){
            const grass = grassArray[i]
            if(
              detectCollision({
                object1:player,
                object2:{...grass, position: {
                  x: grass.position.x - 8 ,
                  y: grass.position.y + 8 
                }}
              })
            ){
              colideGrass.left = true
              break
            }
            else{
              colideGrass.left = false
            }
          }
          if(moving){
            player.x -= player.speed / Math.sqrt(2); // Ruch na skos
            player.y -= player.speed / Math.sqrt(2);
            player.cameraToTopLeft()
            currentFrame = currentFrame % totalFrames.down
            srcX = currentFrame * 252
            if(!colideGrass.left){            
              srcY = 504
            }
            else if(colideGrass.left){
              srcY = 1536
            }
          }
        }
        else if (keyS && keyD){
          for (let i = 0 ; i < blocks.length; i++){
            const block = blocks[i]
            if(
              detectCollision({
                object1:player,
                object2:{...block, position: {
                  x: block.position.x - 8 ,
                  y: block.position.y - 8 
                }}
              })
            ){
              moving = false
              srcX = 0
              break
            }
          }
          for (let i = 0 ; i < grassArray.length; i++){
            const grass = grassArray[i]
            if(
              detectCollision({
                object1:player,
                object2:{...grass, position: {
                  x: grass.position.x - 8 ,
                  y: grass.position.y + 8 
                }}
              })
            ){
              colideGrass.right = true
              break
            }
            else{
              colideGrass.right = false
            }
          }
          if(moving){
            player.x += player.speed / Math.sqrt(2); // Ruch na skos
            player.y += player.speed / Math.sqrt(2);
            player.cameraToBottomRight()
            currentFrame = currentFrame % totalFrames.down
            srcX = currentFrame * 252
            if(!colideGrass.right){            
              srcY = 760
            }
            else if(colideGrass.right){
              srcY = 1792
            }
          }
      }
        else if (keyW) {
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:player,
              object2:{...block, position: {
                x: block.position.x,
                y: block.position.y + 8
              }}
            })
          ){
            moving = false
            srcX = 0
            break
          }
        }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.top = true
            break
          }
          else{
            colideGrass.top = false
          }
        }
        if(moving){
          player.y -= player.speed;
          player.cameraToBottom()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.top){            
            srcY = 252
          }
          else if(colideGrass.top){
            srcY = 1280
          }
        }

      } else if (keyA) {
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:player,
              object2:{...block, position: {
                x: block.position.x + 8,
                y: block.position.y 
              }}
            })
          ){
            moving = false
            srcX = 0
            break
          }
        }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.left = true
            break
          }
          else{
            colideGrass.left = false
          }
        }
        if(moving){
          player.x -= player.speed;
          player.cameraToRight()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.left){            
            srcY = 504
          }
          else if(colideGrass.left){
            srcY = 1536
          }
        }

      } else if (keyS) {
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:player,
              object2:{...block, position: {
                x: block.position.x,
                y: block.position.y - 8
              }}
            })
          ){
            moving = false
            srcX = 0
            break
          }
        }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.down = true
            break
          }
          else{
            colideGrass.down = false
          }
        }
        if(moving){
          player.y += player.speed;
          player.cameraToTop()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.down){            
            srcY = 0
          }
          else if(colideGrass.down){
            srcY = 1024
          }
        }

      } else if (keyD) {
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:player,
              object2:{...block, position: {
                x: block.position.x - 8,
                y: block.position.y
              }}
            })
          ){
            moving = false
            srcX = 0

            break
          }
        }
        for (let i = 0 ; i < grassArray.length; i++){
          const grass = grassArray[i]
          if(
            detectCollision({
              object1:player,
              object2:{...grass, position: {
                x: grass.position.x - 8 ,
                y: grass.position.y + 8 
              }}
            })
          ){
            colideGrass.right = true
            break
          }
          else{
            colideGrass.right = false
          }
        }
        if(moving){
          player.x = player.x + player.speed
          player.cameraToLeft()
          currentFrame = currentFrame % totalFrames.down
          srcX = currentFrame * 252
          if(!colideGrass.right){            
            srcY = 760
          }
          else if(colideGrass.right){
            srcY = 1792
          }
        }
        //player.x += player.speed;

        //console.log(player.speed)
      }
      
    //player.x += player.vx;
    //player.y += player.vy;
    //c.fillRect(player.x,player.y,player.width,player.height)
    


    c.drawImage(startingAreaBackground.image,startingAreaBackground.x,startingAreaBackground.y)
    blocks.forEach((block) =>{
        block.draw()


    })
    grassArray.forEach((grass) =>{
      grass.draw()


  })
    c.fillStyle = 'rgba(0,0,255,0.2)'
    c.fillRect(player.cameraBox.position.x,player.cameraBox.position.y,player.cameraBox.width,player.cameraBox.height)
    player.update()
    c.drawImage(spriteSheet02.image,srcX,srcY,250,250,player.x-32,player.y-58,100,100)
    c.drawImage(startingAreaBackgroundBehind.image,startingAreaBackground.x,startingAreaBackground.y)
    //player.draw()
    //c.drawImage(startingAreaBackground.image,player.x,player.y)
    //c.drawImage(spriteSheet01.image,srcX,srcY,48,48,player.x,player.y,100,100)
    //c.drawImage(playerSpriteSheet,0,0,playerSpriteSheet.width,playerSpriteSheet.height)

    
    slowerFrame++
    if(slowerFrame > 10){
      currentFrame++
      slowerFrame = 0
    }

    requestAnimationFrame(animate)
}

function handleKeyDown(event) {
    // Ustaw odpowiednie flagi przy naciśnięciu klawiszy
    switch (event.key) {
      case 'w':
        keyW = true;
        break;
      case 'a':
        keyA = true;
        break;
      case 's':
        keyS = true;
        break;
      case 'd':
        keyD = true;
        break;
    }
  }

  function handleKeyUp(event) {
    // Zresetuj odpowiednie flagi przy zwolnieniu klawiszy
    switch (event.key) {
      case 'w':
        srcX = 0
        srcY = 252
        if(!colideGrass.top){            
          srcY = 252
        }
        else if(colideGrass.top){
          srcY = 1280
        }
        keyW = false;
        break;
      case 'a':
        srcX = 0
        srcY = 504
        if(!colideGrass.left){            
          srcY = 504
        }
        else if(colideGrass.left){
          srcY = 1536
        }
        keyA = false;
        break;
      case 's':
        srcX = 0
        srcY = 0
        if(!colideGrass.down){            
          srcY = 0
        }
        else if(colideGrass.down){
          srcY = 1024
        }
        keyS = false;
        break;
      case 'd':
        srcX = 0
        if(!colideGrass.right){            
          srcY = 760
        }
        else if(colideGrass.right){
          srcY = 1792
        }
        keyD = false;
        break;
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  animate();

console.log(startingAreaBackground.image)

let weaponType = ["oneHandedSword","twoHandedSword","oneHandedMace","twoHandedMace","oneHandedAxe","twoHandedAxe","spear"]
let armorType = ["helmet","bodyArmor","greave","gloves","boots","belt"]
let jewelryType = ["necklace","ring"]
//attributesWeaponStats = [strength,endurance,agility,inteligence,speed,atkSpeed,physicalDmg,fireDmg,iceDmg,electricDmg]
//attributesArmorStats = [strength,endurance,agility,inteligence,hp,hpPercent,mp,mpPercent,speed,armor,armorPercent,physicalRes,fireRes,iceRes,electricRes]

function itemTypeRandomizer(itemType,itemTypeArray){
  if (itemTypeArray.indexOf(itemType) > -1){
    //console.log("jest na tabeli")
  }
  else{
    let itemTypeArrayRandom = Math.round(Math.random()*100)
    if (itemTypeArrayRandom >= 85){
      itemTypeArray = jewelryType
    }
    else if (itemTypeArrayRandom >= 50){
      itemTypeArray = weaponType
    }
    else if (itemTypeArrayRandom >= 0){
      itemTypeArray = armorType
    }
    itemType = itemTypeArray[Math.floor(Math.random()*itemTypeArray.length)]
    //console.log("nie ma na tabeli",itemType)
  } 
}
function itemColorRandomizer(goldItemChance,yellowItemChance,blueItemChance,whiteItemChance,itemType){

  itemColor = Math.round(Math.random()*100)
  secondaryAttributeChance = Math.round(Math.random()*100)

  if (goldItemChance >= itemColor){
    secondaryAttributeChance >= 75? attributes = 6 : attributes = 5
    console.log("goldItem",itemColor)
  }
  else if (yellowItemChance >= itemColor){
    secondaryAttributeChance >= 60? attributes = 4 : attributes = 3
    console.log("yellowItem",itemColor)
  }
  else if (blueItemChance >= itemColor){
    attributes = (Math.round(Math.random()*1))+1
    console.log("blueItem",itemColor)
  }
  else if (whiteItemChance >= itemColor){
    if(itemType == "ring"||"necklace"){
      attributes = (Math.round(Math.random()*1))+1
      console.log("blueItem",itemColor)
    }else{
    attributes = 0
    console.log("whiteItem",itemColor)
  }
  }
}
function createItem(goldItemChance,yellowItemChance,blueItemChance,whiteItemChance,itemType,itemTypeArray,itemLevel){
  itemTypeRandomizer(itemType,itemTypeArray)
  itemColorRandomizer(goldItemChance,yellowItemChance,blueItemChance,whiteItemChance,itemType);
  console.log("item have " + attributes + " attributes")
  for(i = 0; i > attributes; i++){
    console.log("asdf")
  }
}

createItem(5,15,50,100,"randomItem",weaponType,1)

    
if(this.detectPlayer){
  if(player.x>this.position.x && !this.collide){
    this.position.x += this.speed  
  }
  else if(this.collide){
    this.position.x -= this.speed *2
  }
  if(player.x<this.position.x && !this.collide){
    this.position.x -= this.speed  
  }
  else if(this.collide){
    this.position.x += this.speed *2
  }
  if(player.y>this.position.y && !this.collide){
    this.position.y += this.speed 
  }
  else if(this.collide){
    this.position.y -= this.speed *2
  }
  if(player.y<this.position.y && !this.collide){
    this.position.y -= this.speed  
  }
  else if(this.collide){
    this.position.y += this.speed *2
  }
  console.log('not collide')
}




if(this.detectPlayer){
  //rightdown
  if(player.x>this.position.x && player.y>this.position.y && !this.collide2){
    this.position.x += this.speed
    this.position.y += this.speed 
    console.log('rightdown')  
    
  }
  //lefttop
  else if(player.x>this.position.x && player.y>this.position.y && this.collide2){
    this.position.x -= this.speed 
    this.position.y -= this.speed 
    //this.collide2 = false
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  else if(player.x<this.position.x && player.y<this.position.y && !this.collide2){
    this.position.x -= this.speed  
    this.position.y -= this.speed 
    console.log('lefttop')  
  }
  else if(player.x<this.position.x && player.y<this.position.y && this.collide2){
    this.position.x += this.speed 
    this.position.y += this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)


  }
  else if(player.x>this.position.x && player.y<this.position.y && !this.collide2){
    this.position.x += this.speed
    this.position.y -= this.speed
    console.log('righttop')  
  }
  else if(player.x>this.position.x && player.y<this.position.y && this.collide2){
    this.position.x -= this.speed 
    this.position.y += this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  else if(player.x<this.position.x && player.y>this.position.y && !this.collide2){
    this.position.x -= this.speed
    this.position.y += this.speed 
    console.log('leftdown')  
  }
  else if(player.x<this.position.x && player.y>this.position.y && this.collide2){
    this.position.x += this.speed 
    this.position.y -= this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }

  else if(player.x<this.position.x && !this.collide2){
    this.position.x -= this.speed
  }
  else if(player.x<this.position.x && this.collide2){
    this.position.x += this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  else if(player.x>this.position.x && !this.collide2){
    this.position.x += this.speed
  }
  else if(player.x>this.position.x && this.collide2){
    this.position.x -= this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  else if(player.y<this.position.y && !this.collide2){
    this.position.y -= this.speed
  }
  else if(player.y<this.position.y && this.collide2){
    this.position.y += this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  else if(player.y>this.position.y && !this.collide2){
    this.position.y += this.speed
  }
  else if(player.y>this.position.y && this.collide2){
    this.position.y -= this.speed 
    setTimeout (()=>{
      this.collide2 = false
    },500)

  }
  console.log('not collide')
}

if(this.enemyHitText){
  let textPositionX = this.position.x
  let textPositionY = this.position.y
  class floatingText{
    constructor(){

      c.font = "48px serif";
      c.fillText(player.damage, textPositionX+15, (textPositionY-20)+this.floatingNumber);
      this.floatingNumber -= 1
      setTimeout (()=>{
        this.enemyHitText = false
        this.floatingNumber = 0
      },900)
  }
    }

this.floatingTextArray.push(new floatingText())
}


if(this.enemyHitText){
  c.font = "48px serif";
  c.fillText(player.damage, this.position.x+15, (this.position.y-20)+this.floatingNumber);
  this.floatingNumber -= 1
  setTimeout (()=>{
    this.enemyHitText = false
    this.floatingNumber = 0
  },900)
}



if(this.enemyHitText){
  let textPositionX = this.position.x
  let textPositionY = this.position.y
  class floatingText{

    constructor(){
      this.floatingNumber = 0
      
    }
    draw(){
      c.font = "48px serif";
      c.fillText(player.damage, textPositionX+15, (textPositionY-20)+this.floatingNumber);
      this.floatingNumber -= 1
      
      setTimeout (()=>{
        this.enemyHitText = false
        this.floatingNumber = 0
      },900)

       
}    
     
}    
if(!this.oneTimeText)
{   this.floatingTextArray.push(new floatingText()) 
console.log(this.floatingTextArray)
this.oneTimeText = true
setTimeout (()=>{
this.oneTimeText = false
},900)}
}


function checkGridAvailability(){
  for(let i = 0;i<inventoryGridArray.length;i++){
      if(inventoryGridArray[i]==0){
          if(dimension.y==1&&dimension.x==1){
              spaceAvailabile = true
              break
          }

          if(inventoryGridArray[i+10]==0){
              if(dimension.y==2&&dimension.x==1){
                  spaceAvailabile = true
                  break
              }
              
              if(inventoryGridArray[i+20]==0){
                  if(dimension.y==3&&dimension.x==1){
                      spaceAvailabile = true
                      break
                  }
              }
              }
          }
          if(inventoryGridArray[i+1]==0){
              if(dimension.y==1&&dimension.x==2){
                  spaceAvailabile = true
                  break
              }
      }
      else{
         
      }
      
      }
      //Brak miejsca 
}




enemyMovementAttack(){  
  this.moving = true
    if(this.detectPlayer){
      //rightdown
      if(player.x-10>this.position.x && player.y>this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x - 4 ,
                y: block.position.y - 4 
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x += this.speed
          this.position.y += this.speed 
        }       
    }
      //lefttop       
      else if(player.x-10<this.position.x && player.y<this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x + 4 ,
                y: block.position.y + 4 
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x -= this.speed  
          this.position.y -= this.speed 
        } 
      }
      else if(player.x-10>this.position.x && player.y<this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x - 4 ,
                y: block.position.y + 4 
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x += this.speed
          this.position.y -= this.speed
        } 
      }   
      
      else if(player.x-10<this.position.x && player.y>this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x + 4 ,
                y: block.position.y - 4 
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x -= this.speed
          this.position.y += this.speed 
        } 
        //console.log('leftdown')  
      }
      else if(player.x-10<this.position.x){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x + 4  
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x = this.position.x - this.speed
        } 
      }
      else if(player.x-10>this.position.x){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.x - 4  
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.x += this.speed
        } 
      }
      else if(player.y<this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.y + 4  
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.y -= this.speed
        } 
      }
      else if(player.y>this.position.y){
        for (let i = 0 ; i < blocks.length; i++){
          const block = blocks[i]
          if(
            detectCollision({
              object1:this,
              object2:{...block, position: {
                x: block.position.y - 4  
              }}
            })
          ){
            this.moving = false
            break
          }
        }
        if(this.moving){
          this.position.y += this.speed
        } 

      }
      v.fillStyle = 'red'
      v.fillRect(this.position.x+28-38, this.position.y-12,this.enemyTextWidthHpBar*2,6)
      v.fillStyle = 'green'
      v.fillRect(this.position.x+28-38, this.position.y-12,this.currentHpBar,6)
    }
    //console.log(this.position.x,this.position.y)
}

}


if(player.x-10>this.position.x && player.y>this.position.y){

  for (let i = 0 ; i < blocks.length; i++){
    const block = blocks[i]
    
    if(
      detectCollision({
        object1:this,
        object2:{...block, position: {
          x: block.position.x - 4 ,
          y: block.position.y - 4 
        }}
      })
    ){
      if(
        !detectCollision({
          object1:this,
          object2:{...block, position: {
            x: block.position.x - 8 ,
            
          }}
        })
      )
      {
        this.position.x += this.speed
        this.moving = false
      }
      else{
        if(
          !detectCollision({
            object1:this,
            object2:{...block, position: {
              x: block.position.y - 8 ,
              
            }}
          })
        )
        {
          this.position.y += this.speed
          this.moving = false
        }
        else{
          this.moving = false
          break
        }


      }
      
    }
  }
  
  if(this.moving){
    this.position.x += this.speed
    this.position.y += this.speed 
  }       
}

enemyDetectAttack(){
  if(detectCollision2({
    object1:this.detectionRangeObject,
    object2:player
  })){

      clearTimeout(this.enemyTimer)

      
      this.detectPlayer = true
      this.attacking = true
      //console.log('attack')
    }
  
  else if(!detectCollision2({
      object1:this.detectionRangeObject,
      object2:player
    })){
      if(this.attacking){
        this.enemyTimer = setTimeout(function(){
          this.detectPlayer = false
          this.attacking = false
        },5000)
        //console.log('not attack')
      }
        
      }
      console.log(this.enemyTimer)
}
enemyTimerAttack(){
  this.detectPlayer = false
  this.attacking = false
  clearTimeout(this.enemyTimer)
  //console.log('???')
}
resetEnemyTimerAttack(){

}



this.moving = true
this.collideDown = false
this.collideTop = false
this.collideRight = false
this.collideLeft = false
//this.collideWithEnemies()
  if(this.detectPlayer){
    //rightdown
    if(player.x-10>this.position.x && player.y>this.position.y){
      for (let i = 0 ; i < blocks.length; i++){
        const block = blocks[i]
        if(
          detectCollision({
            object1:this,
            object2:{...block, position: {
              x: block.position.x - 4 ,
              y: block.position.y - 4 
            }}
          })
        ){
          if(
            this.x + this.width >= block.position.x - 4 //&&
            //this.x <= block.position.x - 4 + block.width
          ){
            this.collideRight = true
          }
          if(
            this.y <= block.position.y - 4 + block.height //&&
            //this.y + this.height >= block.position.y - 4
          ){
            this.collideDown = true
          }
          if(this.collideRight&&this.collideDown){
            this.moving = false
            break
          }

        }
      }
      if(this.moving){
        if(!this.collideRight){
          this.position.x += this.speed
        }
        if(!this.collideDown){
          this.position.y += this.speed 
        }   
      }  
  }


  enemyMovementAttack(){  
    this.x = this.position.x
    this.y = this.position.y
    this.blockRight = false
    this.blockDown = false
      //this.collideWithEnemies()
        if(this.detectPlayer){
          this.moving = true
          //right
          if(player.x-10>this.position.x&&player.y<this.position.y+5&&player.y>this.position.y-5){
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x - 4 ,
                    y: block.position.y  
                  }}
                })
              ){
                console.log('prawoBlock')
                this.moving = false
                break
              }
            }
            if(this.moving){
              //console.log('prawo')
              this.position.x += this.enemySpeed
            } 
          }
          //left
          else if(player.x-10<this.position.x&&player.y<this.position.y+5&&player.y>this.position.y-5){
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x + 4 ,
                    y: block.position.y 
                  }}
                })
              ){
                console.log('lewoBlock')
                this.moving = false
                break
              }
            }
            if(this.moving){
              //console.log('lewo')
              this.position.x = this.position.x - this.enemySpeed
            } 
          }
          //top
          else if(player.y+10<this.position.y&&player.x+10<this.position.x+25&&player.x+10>this.position.x+10){
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x  ,
                    y: block.position.y + 4
                  }}
                })
              ){
                this.moving = false
  
                break
              }
            }
            if(this.moving){
              //console.log('gora')
              this.position.y -= this.enemySpeed
            } 
          }
          else if(player.y+10>this.position.y&&player.x+10<this.position.x+25&&player.x+10>this.position.x+10){
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x  ,
                    y: block.position.y - 4
                  }}
                })
              ){
                this.moving = false
  
                break
              }
            }
            if(this.moving){
              //console.log('dol')
              this.position.y += this.enemySpeed
            } 
          }
          //rightdown
  
          else if(player.x-10>this.position.x && player.y>this.position.y){
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x - 4 ,
                    y: block.position.y - 4
                  }}
                })
              ){
                if(
                  detectCollision({
                    object1:this,
                    object2:{...block, position: {
                      x: block.position.x - 4 ,
                      y: block.position.y 
                    }}
                  })
                ){
                  
                  this.blockRight = true
                  //console.log('block')
                  break
                }
                if(
                  detectCollision({
                    object1:this,
                    object2:{...block, position: {
                      x: block.position.x  ,
                      y: block.position.y - 4
                    }}
                  })
                ){
                  this.blockDown = true
                  //console.log('block')
                  break
                }
              }
            }
  
              //console.log(this.moving)
              //console.log('prawoDol')
              if(!this.blockRight){
                this.position.x += this.enemySpeed
              }
              if(!this.blockDown){
                this.position.y += this.enemySpeed
              }
  
                  
        }
          //lefttop       
          else if(player.x-10<this.position.x && player.y<this.position.y){
  
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x + 4 ,
                    y: block.position.y + 4 
                  }}
                })
              ){
                this.moving = false
                break
              }
            }
            if(this.moving){
              //console.log('lewoGora')
              this.position.x -= this.enemySpeed 
              this.position.y -= this.enemySpeed 
            } 
          }
          else if(player.x-10>this.position.x && player.y<this.position.y){
  
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x - 4 ,
                    y: block.position.y + 4 
                  }}
                })
              ){
                this.moving = false
                break
              }
            }
            if(this.moving){
              //console.log('prawoGora')
              this.position.x += this.enemySpeed
              this.position.y -= this.enemySpeed
            } 
          }   
          
          else if(player.x-10<this.position.x && player.y>this.position.y){
  
            for (let i = 0 ; i < blocks.length; i++){
              const block = blocks[i]
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x + 4 ,
                    y: block.position.y - 4 
                  }}
                })
              ){
                this.moving = false
                break
              }
            }
            if(this.moving){
              //console.log('lewoDol')
              this.position.x -= this.enemySpeed
              this.position.y += this.enemySpeed 
            } 
            //console.log('leftdown')  
          }
          
          
          
          v.fillStyle = 'red'
          v.fillRect(this.position.x+28-38, this.position.y-12,this.enemyTextWidthHpBar*2,6)
          v.fillStyle = 'green'
          v.fillRect(this.position.x+28-38, this.position.y-12,this.currentHpBar,6)
        }
        //console.log(this.position.x,this.position.y)
        //console.log(player.y,this.position.y)
        //console.log(player.x+10,this.position.x+30)
    }
    
    }