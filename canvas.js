const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 1224;

canvas.height = 776;

const secondCanvas = document.getElementById("canvasOnTop");
const v = secondCanvas.getContext("2d");

secondCanvas.width = 1224;
secondCanvas.height = 976;

const fps = 120

const collisionMap = []
for(let i = 0; i < collisions.length; i += 80){
    collisionMap.push(collisions.slice(i, 80 + i))
}
const collisionGrass = []
for(let i = 0; i < grassCollision.length; i += 80){
  collisionGrass.push(grassCollision.slice(i, 80 + i))
}
class Block {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw(){
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)
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
const enemies = []
const blocks = []
const grassArray = []
const trees = []
const offset = {
    x:0,
    y:-900
}

const textBox = new Image
textBox.src = 'images/textbox.png'
const quickBar = new Image
quickBar.src = 'images/quickBar.png'
const invSign = new Image
invSign.src = 'images/invSign.png'
const invSignHover = new Image
invSignHover.src = 'images/inventoryHover.png'
const statSign = new Image
statSign.src = 'images/statSign.png'
const statSignHover = new Image
statSignHover.src = 'images/settingsHover.png'
const xSign = new Image
xSign.src = 'images/xSign.png'
const xSignHover = new Image
xSignHover.src = 'images/xSignHover.png'
const inventory = new Image
inventory.src = 'images/inventory3.png'
const infoCell = new Image
infoCell.src = 'images/infoCell.png'
infoCell.height = 400
const slider = new Image
slider.src = 'images/slider.png'
const acceptButton = new Image
acceptButton.src = 'images/acceptButton.png'
const acceptButtonHiglited = new Image
acceptButtonHiglited.src = 'images/acceptButtonHighlited.png'
const cancelButton = new Image
cancelButton.src = 'images/cancelButton.png'
const cancelButtonHiglited = new Image
cancelButtonHiglited.src = 'images/cancelButtonHighlited.png'
const inventoryTrash = new Image
inventoryTrash.src = 'images/trash.png'
const weaponsInField = new Image
weaponsInField.src = 'images/attack/punch.png'

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

class SpriteSheet{
    constructor(columns,rows,imageSrc){
        
        this.columns = columns;
        this.rows = rows;
        this.image = new Image()
        this.image.src = imageSrc;
    }
}

class Background{
    constructor({position},imageSrc){

        this.position = position
        this.image = new Image()
        this.image.src = imageSrc;
    }
   draw(){
    
   }    
}

const spriteSheet02 = new SpriteSheet(12,8,"images/catSprite2.png")
//const spriteSheet01 = new SpriteSheet(12,8,"images/spritePlayer.png")
const startingAreaBackground = new Background({position:{x:0,y:-900}},"images/startingAreaZoom.png")
const startingAreaBackgroundBehind = new Background({position:{x:0,y:-900}},"images/startingAreaZoomBehind.png")

let startedBottom = false
let attackInProgress = false;
let actualCarryWeight = 0 ;
let showInventoryCarryWeight ;
let type;
let invSignHoverVar = false;
let statSignHoverVar = false;
let xSignHoverVar = false;
let disabled = false;
let itemFoundOnGround = false;
let acceptButtonHover = false;
let cancelButtonHover = false;
let firstHover = false;
let beginningBlockArray = []
let startingPointOnCreateItem;
let spaceAvailabile = false;
let itemOnGrid = []
let currentGrid = []
let gridFreeSlotCheck = 0;
let itemInHand = false;
let currentItem;
let currentItemOnHover;
let lockInventory = false;
//let lockInventoryWhenHover = false
let startHovering = false;
let currentItemOn = false;
let allLoaded = false;
let text1;
let messageCount = 0;
let messageOn = false;
let messageCooldown = false;
let stopAll = false;
let slowerFrame = 0;
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
let colideGrassShadow = false

let srcX = 0
let srcY = 0
let currentFrame = 0
let currentDirection = 'right'

let slowerAttackFrame = 0
let attackCurrentFrame = 0

const inventoryStartingXPosition = 585;
const inventoryStartingYPosition = 182;
let newItemPositionX;
let newItemPositionY;
let tempYPosition;
let dimensionX;
let dimensionY;


const items = []
const itemsOnGround = []

const player = new Player (canvas.width/2-48,canvas.height/2-48,40,40,'blue',7)

enemies.push(new Enemy({position:{x:400,y:400},level:1,type:'slime',race:'creature',rarity:'random'}))
//enemies.push(new Enemy({position:{x:400,y:600},level:1,type:'slime',race:'creature',rarity:'random'}))

trees.push(new WoodTree({position:{x:800,y:400},type:'normal'}))
trees.push(new WoodTree({position:{x:900,y:400},type:'withered'}))
trees.push(new WoodTree({position:{x:950,y:600},type:'normal'}))
//const enemy01 = new Enemy({position:{x:400,y:400},level:1,type:'slime',race:'creature',rarity:'random'})
//enemies.push(enemy01)
let indexZ = 0
const inventoriesFreeSlot = []
const inventories = []
for(let i = 0;i<8;i++){
  for(let j=0;j<10;j++){
    
    
    inventories.push(new InventoryGrid({position:{x:585+(j*59),y:182+(i*50)},index:indexZ}))
    indexZ++
  }
}
function attack(){
  if(player.weaponDraw){

      c.drawImage(weaponsInField,attackSrcX,attackSrcY,100,100,player.attackDirectionX-25,player.attackDirectionY-35,player.detectionPlayerAttackRangeObject.width+50,player.detectionPlayerAttackRangeObject.height+50)

    attackInProgress = true
    attackCurrentFrame = attackCurrentFrame % 3
    attackSrcX = attackCurrentFrame * 100
    slowerAttackFrame++

    if(slowerAttackFrame > 6){
      attackCurrentFrame++
      slowerAttackFrame = 0
    }
    if(attackCurrentFrame==3){
  
      attackCurrentFrame=0
      slowerAttackFrame=0
      attackSrcX = 0
      player.weaponDraw=false
      attackInProgress = false
      srcX=0
      startedBottom=false
    }
  }
}


player.x = 500
player.y = 400

let keyW = false;
let keyA = false;
let keyS = false;
let keyD = false;
let keyE = false;
let keyECooldown = false;
let keySpace = false;
let inventoryOpen = false;


function detectCollision({object1,object2}){
  return (
    object1.x + object1.width >= object2.position.x &&
    object1.x <= object2.position.x + object2.width &&
    object1.y <= object2.position.y + object2.height &&
    object1.y + object1.height >= object2.position.y
  )
}
function detectCollision2({object1,object2}){
  return (
    object1.x + object1.width >= object2.x &&
    object1.x <= object2.x + object2.width &&
    object1.y <= object2.y + object2.height &&
    object1.y + object1.height >= object2.y
  )
}
function detectCollision3({object1,object2}){
  return (
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.y + object1.height >= object2.position.y
  )
}
function detectCollision4({object1,object2}){
  return (
    object1.position.x + object1.width/2 >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width/2 &&
    object1.position.y <= object2.position.y + object2.height/2 &&
    object1.position.y + object1.height/2 >= object2.position.y
  )
}

let movables = [...blocks,...grassArray,...enemies,startingAreaBackground,...trees,...itemsOnGround]

player.x = player.x + 100



function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    v.clearRect(0,0,secondCanvas.width,secondCanvas.height)

    player.attack()

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
            colideGrassShadow = true
            colideGrass.right = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.right = false
          }
        }
        if(moving){
          movingSprite = true
          player.x += player.speed / Math.sqrt(2); // Ruch na skos
          player.y -= player.speed / Math.sqrt(2);
          player.cameraToTopRight()
          currentDirection = 'right'
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
            colideGrassShadow = true
            colideGrass.left = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.left = false
          }
        }
        if(moving){
          player.x -= player.speed / Math.sqrt(2); // Ruch na skos
          player.y += player.speed / Math.sqrt(2);
          player.cameraToBottomLeft()
          currentDirection = 'left'
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
              colideGrassShadow = true
              colideGrass.left = true
              break
            }
            else{
              colideGrassShadow = false
              colideGrass.left = false
            }
          }
          if(moving){
            player.x -= player.speed / Math.sqrt(2); // Ruch na skos
            player.y -= player.speed / Math.sqrt(2);
            player.cameraToTopLeft()
            currentDirection = 'left'
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
              colideGrassShadow = true
              colideGrass.right = true
              break
            }
            else{
              colideGrassShadow = false
              colideGrass.right = false
            }
          }
          if(moving){
            player.x += player.speed / Math.sqrt(2); // Ruch na skos
            player.y += player.speed / Math.sqrt(2);
            player.cameraToBottomRight()
            currentDirection = 'right'
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
            colideGrassShadow = true
            colideGrass.top = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.top = false
          }
        }
        if(moving){
          player.y -= player.speed;
          player.cameraToBottom()
          currentDirection = 'top'
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
            colideGrassShadow = true
            colideGrass.left = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.left = false
          }
        }
        if(moving){
          player.x -= player.speed;
          player.cameraToRight()
          currentDirection = 'left'
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
            colideGrassShadow = true
            colideGrass.down = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.down = false
          }
        }
        if(moving){
          player.y += player.speed;
          player.cameraToTop()
          currentDirection = 'bottom'
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
            colideGrassShadow = true
            colideGrass.right = true
            break
          }
          else{
            colideGrassShadow = false
            colideGrass.right = false
          }
        }
        if(moving){
          player.x = player.x + player.speed
          player.cameraToLeft()
          currentDirection = 'right'
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

    c.drawImage(startingAreaBackground.image,startingAreaBackground.position.x,startingAreaBackground.position.y)
    blocks.forEach((block) =>{
        block.draw()
    })
    grassArray.forEach((grass) =>{
      grass.draw()
    })

    itemsOnGround.forEach((itemOnGround)=>{
      itemOnGround.draw()
      })
    enemies.forEach((enemy) =>{
      enemy.draw()
    })
    trees.forEach((tree)=>{
      tree.drawBottom()
    })
    //c.fillStyle = 'rgba(0,0,255,0.2)'
    //c.fillRect(player.cameraBox.position.x,player.cameraBox.position.y,player.cameraBox.width,player.cameraBox.height)


    player.update()
    player.draw()
    
    if(!startedBottom){
      attack()
    }
    c.drawImage(spriteSheet02.image,srcX,srcY,250,250,player.x-32,player.y-58,100,95)
    if(startedBottom){
      attack()
    }
    c.drawImage(startingAreaBackgroundBehind.image,startingAreaBackground.position.x,startingAreaBackground.position.y)
    

   

    trees.forEach((tree)=>{
      tree.drawTop()
    })

    enemies.forEach((enemy)=>{
      enemy.drawDmgText()
    })
    c.drawImage(quickBar,0,695,620,80)
    if(!invSignHoverVar){
      c.drawImage(invSign,970,695,90,80)
    }
    else{
      c.drawImage(invSignHover,970,695,90,80)
    }
    if(!statSignHoverVar){
      c.drawImage(statSign,1090,695,90,80)
    }
    else{
      c.drawImage(statSignHover,1090,695,90,80)
    }

    messageOnCanvas()
    if(inventoryOpen){
      openInventory()
    }
    drawSettings()
    

    takeBagContent()
    
    slowerFrame++
    if(slowerFrame > 10){
      currentFrame++
      slowerFrame = 0
    }
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000 / fps);
    //requestAnimationFrame(animate)
}

function handleKeyDown(event) {
    // Ustaw odpowiednie flagi przy naciśnięciu klawiszy
    if(!stopAll){

    switch (event.key) {
      case 'w':
        case 'W':
        keyW = true;
        break;
      case 'a':
        case 'A':
        keyA = true;
        break;
      case 's':
        case 'S':
        keyS = true;
        break;
      case 'd':
        case 'D':
        keyD = true;
        break;
      case ' ':
        keySpace = true;
        break;
    }
  }
    switch (event.key){
      case 'e':
        case 'E':
        if(!keyECooldown){
          //console.log('e')
          keyE = true;
        }
        break;
      case 'Enter':
        keyE = true;
        break;
      case 'Escape':
        if(inventoryOpen&&!lockInventory&&!currentItemOn){
          if(firstHover){
            currentItemOnHover.hoverOn = false
          }
          inventoryOpen = false;
          stopAll = false;   
        }
        else if(!inventoryOpen&&!settingsOpen){
          console.log('open settings')
          resetDirectionsButtons();
          settingsOpen = true;
          stopAll = true;
        }
        else if(!inventoryOpen&&settingsOpen){
          console.log('close settings')
          settingsOpen = false;
          stopAll = false;
        }
        break
      case 'i':
        case 'I':
        if(!inventoryOpen){
          inventoryOpen = true;
          stopAll = true;
        }

      else if(inventoryOpen&&!lockInventory&&!currentItemOn){
        inventoryOpen = false;
        stopAll = false;
        
      }
        break;
    }
    
    }
  
  

  function handleKeyUp(event) {
    // Zresetuj odpowiednie flagi przy zwolnieniu klawiszy
    if(!stopAll){
    switch (event.key) {
      case 'w':
        case 'W':
        srcX = 0
        srcY = 252
        if(!colideGrass.top){    
          colideGrassShadow = false        
          srcY = 252
        }
        else if(colideGrass.top){
          colideGrassShadow = true
          srcY = 1280
        }
        keyW = false;
        currentDirection = 'top'
        break;
      case 'a':
        case 'A':
        srcX = 0
        srcY = 504
        if(!colideGrass.left){ 
          colideGrassShadow = false           
          srcY = 504
        }
        else if(colideGrass.left){
          colideGrassShadow = true
          srcY = 1536
        }
        keyA = false;
        currentDirection = 'left'
        break;
      case 's':
        case 'S':
        srcX = 0
        srcY = 0
        if(!colideGrass.down){ 
          colideGrassShadow = false           
          srcY = 0
        }
        else if(colideGrass.down){
          colideGrassShadow = true
          srcY = 1024
        }
        keyS = false;
        currentDirection = 'bottom'
        break;
      case 'd':
        case 'D':
        srcX = 0
        if(!colideGrass.right){   
          colideGrassShadow = false         
          srcY = 760
        }
        else if(colideGrass.right){
          colideGrassShadow = true
          srcY = 1792
        }
        keyD = false;
        currentDirection = 'right'
        break;
      case ' ':
        keySpace = false;
        break;
      }
    }
      switch (event.key){
        case 'e':
          case 'E':
          keyECooldown=false;
          keyE = false;
          break;
        case 'Enter':
          keyE = false;
          break;

       // case 'i':
          //if(inventoryOpen){
            //setTimeout (()=>{
              //inventoryOpen = false;

            //},900)
            //break;
          //}

      }
    }

  let mouseIsDown = false
  function mouseDown(){
    if(inventoryOpen){
      mouseIsDown = true
      //console.log('mouse is down true')
    }
  }
  function mouseUp(){
    if(inventoryOpen){
      mouseIsDown = false
      //console.log('mouse is down false')
    }
  }
  let rescaledX;
  let rescaledY;
  let actualRect = document.getElementById("canvas").getBoundingClientRect()
  function resize(){
    actualRect = document.getElementById("canvas").getBoundingClientRect()
    //items.map((item)=>{
    //  item.position.x=item.position.x*(actualRect.width/1224);
    //  item.width=item.width*(actualRect.width/1224);
    //  item.position.y=item.position.y*(actualRect.height/776);
    //  item.height=item.height*(actualRect.height/776);
    //})


}


  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('click', checkIfValidItem)
  window.addEventListener('click', clickAcceptOrCancel)
  window.addEventListener('click', changeEquipment)
  window.addEventListener('click', clickOnSign)
  window.addEventListener('mousemove', moveIfValidItem)
  window.addEventListener('mousemove', detectEquipmentCollision)
  window.addEventListener('mousemove', hoverOnItem)
  window.addEventListener('mousemove', moveStackSlider)
  window.addEventListener('mousemove', hoverOnSign)
  window.addEventListener('mousedown', mouseDown)
  window.addEventListener('mouseup', mouseUp)
  window.addEventListener('resize',resize)
  window.addEventListener('mousemove', enemyShowNameHp)

  animate();



  const showInventoryStat = {
    strength:player.strength,
    endurance:player.endurance,
    intelligence:player.intelligence,
    agility:player.agility,
    charisma:player.charisma,

    damage:player.minDamage+" - "+player.maxDamage,
    maxHp:player.maxHp,
    physicalDefence:player.physicalDefence+" %",
    maxMp:player.maxMp,
    magicalDefence:player.magicalDefence+" %",
  }
  const showInventoryStatText = {
    strength:"Strength : ",
    endurance:"Endurance : ",
    intelligence:"Intelligence : ",
    agility:"Agility : ",
    charisma:"Charisma : ",

    damage:"Damage : ",
    maxHp:"Max Hp : ",
    physicalDefence:"Physical Defence : ",
    maxMp:"Max Mp : ",
    magicalDefence:"Magical Defence : ",
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = randomIntFromInterval(1, 6)


createItem(5,15,50,100,"randomItem",weaponType,1)

dimensionX=1;
dimensionY=1;
checkGridAvailability(dimensionX,dimensionY)
  if(spaceAvailabile){
    lameCalculations()
    items.push(new Item({position:{x:newItemPositionX,y:newItemPositionY},dimensions:{x:1,y:1}},
      beginningBlockArray,
      {name:"Amulet",type:'jewellery',ammount:1,weight:1}))
  }
  dimensionX=1;
dimensionY=1;
for(let i = 0;i<2;i++){
checkGridAvailability(dimensionX,dimensionY)
  if(spaceAvailabile){
    lameCalculations()
    items.push(new Item({position:{x:newItemPositionX,y:newItemPositionY},dimensions:{x:1,y:1}},
      beginningBlockArray,
      {name:"Ring",type:'jewellery',ammount:1,weight:1}))
  }
}


createNewItem({itemId:stick,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:dagger,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:shortSpear,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:bronzeCoin,rarity:'white',ammount:600,tier:1})
createNewItem({itemId:bronzeCoin,rarity:'white',ammount:200,tier:1})
createNewItem({itemId:bronzeCoin,rarity:'white',ammount:600,tier:1})
createNewItem({itemId:bronzeCoin,rarity:'white',ammount:200,tier:1})
createNewItem({itemId:leatherArmor,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:leatherHelmet,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:leatherGloves,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:leatherBoots,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:leatherBelt,rarity:'white',ammount:1,tier:1})
createNewItem({itemId:'random',rarity:'random',ammount:1,tier:1})

inventoryStatDraw()
inventoryAttributesUpdate()

//console.log(weaponsInField)

allLoaded = true

  