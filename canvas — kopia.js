const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const collisionMap = []
for(let i = 0; i < collisions.length; i += 80){
    collisionMap.push(collisions.slice(i, 80 + i))
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
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
const blocks = []
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

console.log(blocks)

//const collisions2D = []
//for (let i = 0; i < collisions.length; i += 144) {
//    collisions2D.push(collisions.slice(i, i + 144))
///}

//const collisionsBlocks = []
//collisions2D.forEach((row, y) => {
//  row.forEach((symbol, x) => {
//    if (symbol === 1907) {
//        collisionsBlocks.push(
//        new CollisionBlock({
//          position: {
//            x: x * 16,
//            y: y * 16,
//          },
//          height:6,
//        })
//      )
//    }
// })
//})

//const button = document.querySelector('.asdf')
//let i=1;

//const playerSpriteSheet = new Image();
//playerSpriteSheet.src = "images/sprite01.png"
//playerSpriteSheet.onload = loadImages;

class Player{
    constructor(x,y,width,height,color,vx,vy,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.speed = speed
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

class Background{
    constructor(imageSrc){
        
        this.image = new Image()
        this.image.src = imageSrc;
    }
   draw(){
    
   }    
}

const spriteSheet01 = new SpriteSheet(12,8,"images/spritePlayer.png")
const startingAreaBackground = new Background("images/startingAreaZoom.png")

let totalFrames = {
    left:3,
    right:3,
    top:3,
    down:3
}
let srcX = 48 *7
let srcY = 0
let currentFrame = 0



//const players = []
const player = new Player (canvas.width/2-48,canvas.height/2-48,50,75,'blue',0,0,-7)

player.x = 0
player.y = -900
//addEventListener('click',()=>{
//    let randomColor = Math.round(Math.random()*1)
//    let color  
//    randomColor == 1 ? color = 'red' : color = 'blue'

//    players.push(new Player(
 //       (Math.random()*20)-10,
 //       Math.random()*20,
//        color,
//    ))
//    i++;
//    button.innerHTML = i;
 //   console.log(players)
//    console.log(randomColor)

//})

//let columns = 12;
//let rows = 8;

let keyW = false;
let keyA = false;
let keyS = false;
let keyD = false;

let movables = [startingAreaBackground, ...blocks]

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    if (keyW && keyD) {
        player.x += player.speed / Math.sqrt(2); // Ruch na skos
        player.y -= player.speed / Math.sqrt(2);
        movables.x += player.speed / Math.sqrt(2); // Ruch na skos
        movables.y -= player.speed / Math.sqrt(2);
      } else if (keyS && keyA){
        player.x -= player.speed / Math.sqrt(2); // Ruch na skos
        player.y += player.speed / Math.sqrt(2);
      }
        else if (keyW && keyA){
        player.x -= player.speed / Math.sqrt(2); // Ruch na skos
        player.y -= player.speed / Math.sqrt(2);
        }
        else if (keyS && keyD){
        player.x += player.speed / Math.sqrt(2); // Ruch na skos
        player.y += player.speed / Math.sqrt(2);
      }
        else if (keyW) {
        player.y -= player.speed;

      } else if (keyA) {
        player.x -= player.speed;
      } else if (keyS) {
        player.y += player.speed;
      } else if (keyD) {
        player.x += player.speed;
      }
    //player.x += player.vx;
    //player.y += player.vy;
    //c.fillRect(player.x,player.y,player.width,player.height)
    

    currentFrame = currentFrame % totalFrames.down
    srcX = currentFrame * 48
    c.drawImage(startingAreaBackground.image,player.x,player.y)
    blocks.forEach(block =>{
        block.draw()
        
    })
    c.drawImage(spriteSheet01.image,srcX,srcY,48,48,canvas.width/2-48,canvas.height/2-48,100,100)

    //c.drawImage(startingAreaBackground.image,player.x,player.y)
    //c.drawImage(spriteSheet01.image,srcX,srcY,48,48,player.x,player.y,100,100)
    //c.drawImage(playerSpriteSheet,0,0,playerSpriteSheet.width,playerSpriteSheet.height)

    
    currentFrame++
    requestAnimationFrame(animate)
}




function handleKeyDown(event) {
    // Ustaw odpowiednie flagi przy naciśnięciu klawiszy
    switch (event.key) {
      case 'w':
        keyW = true;
        console.log("w on")
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
        keyW = false;
        console.log("w off")
        break;
      case 'a':
        keyA = false;
        break;
      case 's':
        keyS = false;
        break;
      case 'd':
        keyD = false;
        break;
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  animate();

//let numOfImages = 1;
//function loadImages(){
//    if(--numOfImages > 0) return
//}
console.log(spriteSheet01.image)
//console.log(playerSpriteSheet)
console.log(spriteSheet01.image.height)
console.log(startingAreaBackground.image)

let weaponType = ["oneHandedSword","twoHandedSword","oneHandedMace","twoHandedMace","oneHandedAxe","twoHandedAxe","spear"]
let armorType = ["helmet","bodyArmor","greave","gloves","boots","belt"]
let jewelryType = ["necklace","ring"]
//attributesWeaponStats = [strength,endurance,agility,inteligence,speed,atkSpeed,physicalDmg,fireDmg,iceDmg,electricDmg]
//attributesArmorStats = [strength,endurance,agility,inteligence,hp,hpPercent,mp,mpPercent,speed,armor,armorPercent,physicalRes,fireRes,iceRes,electricRes]

function itemTypeRandomizer(itemType,itemTypeArray){
  if (itemTypeArray.indexOf(itemType) > -1){
    console.log("jest na tabeli")
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
    console.log("nie ma na tabeli",itemType)
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

    
