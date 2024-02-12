class FloatingText{
  constructor(floatingTextX,floatingTextY,playerDamage){
    this.floatingTextX = floatingTextX,
    this.floatingTextY = floatingTextY,
    this.playerDamage = playerDamage
    this.floatingNumber = 0
    this.active = true
}
draw(){
  if(this.active){
    if(keyW&&keyD){
      this.floatingTextY +=7 /Math.sqrt(2)
      this.floatingTextX -=7 /Math.sqrt(2)
    }
    else if(keyS&&keyD){
      this.floatingTextY -=7 /Math.sqrt(2)
      this.floatingTextX -=7 /Math.sqrt(2)
    }
    else if(keyW&&keyA){
      this.floatingTextY +=7 /Math.sqrt(2)
      this.floatingTextX +=7 /Math.sqrt(2)
    }
    else if(keyS&&keyA){
      this.floatingTextY -=7 /Math.sqrt(2)
      this.floatingTextX +=7 /Math.sqrt(2)
    }
    else if(keyD){
      this.floatingTextX -=7
    }
    else if(keyA){
      this.floatingTextX +=7
    }
    else if(keyW){
      this.floatingTextY +=7
    }
    else if(keyS){
      this.floatingTextY -=7
    }

    v.fillStyle = 'red'
    v.font = "48px serif";
    v.fillText(this.playerDamage, this.floatingTextX+15, (this.floatingTextY-20)+this.floatingNumber);
    this.floatingNumber -= 1
    setTimeout (()=>{
      //this.floatingNumber = 0
      this.active = false
    },900)
  }

}
}




enemyLvl = []
enemyType = ['slime','skeleton']
enemyRace = ['creature','undead']
enemyRarity = ['white','blue','yellow','unique']

class Enemy {
  constructor({position,level,type,race,rarity}){
    this.position = position

    if(level=='random'){
        level = Math.round(Math.random()*100)
    }
    this.level = level;
    if (enemyType.indexOf(type) > -1){
        this.type = type;
    }
    else {

    }
    this.race = race;

    this.rarity = rarity;
    if(rarity=='random'){
      this.spawnChance = Math.round(Math.random()*100)

      this.spawnChance <= 60? this.rarity = 'white' : this.spawnChance <= 85? this.rarity = 'blue' : this.spawnChance <= 95? this.rarity = 'yellow' : this.spawnChance <= 100? this.rarity = 'unique' : this.rarity = 'unique'
    }
    this.highlithedStats = false

    this.image = new Image()
    this.imageDeath = new Image()
    this.imageInGrass = new Image()
    if(type=='slime'){
        this.rarity == 'white'? this.image.src = "images/SlimeEnemy/Idle/GreenIdle2.png" : this.rarity == 'blue'? this.image.src = "images/SlimeEnemy/Idle/GreenIdle3.png": this.rarity == 'yellow'? this.image.src = "images/SlimeEnemy/Idle/GreenIdle1.png":this.rarity == 'unique'? this.image.src = "images/SlimeEnemy/Idle/GoldIdle.png":this.image.src = "images/SlimeEnemy/Idle/GoldIdle.png"
        this.rarity == 'white'? this.imageDeath.src = 'images/SlimeEnemy/Death/Slime1Death.png' : this.rarity == 'blue'? this.imageDeath.src = 'images/SlimeEnemy/Death/Slime1Death.png': this.rarity == 'yellow'? this.imageDeath.src = 'images/SlimeEnemy/Death/Slime2Death.png':this.rarity == 'unique'? this.imageDeath.src = 'images/SlimeEnemy/Death/SlimeGoldDeath.png':this.imageDeath.src = 'images/SlimeEnemy/Death/SlimeGoldDeath.png'
        this.rarityOnName ;
        this.rarity == 'white'? this.rarityOnName='' : this.rarity == 'blue'? this.rarityOnName='Uncommon': this.rarity == 'yellow'? this.rarityOnName='Rare':this.rarity == 'unique'? this.rarityOnName='Elite':this.rarityOnName='Elite'
        //this.image.src = "images/SlimeEnemy/Idle/GreenIdle.png"
        this.imageInGrass.src = 'images/SlimeEnemy/Idle/slimeInGrass.png'
        this.spriteWidth = 90
        this.spriteHeight = 32
        this.x = this.position.x
        this.y = this.position.y
        this.width = 60
        this.height = 40
        this.srcX = 0
        this.srcY = 0
        this.currentFrame = 0
        this.totalFramesIdle = 7
        this.slowerFrame = 0
        this.enemyIdle = true
        this.attacking = false
        this.randomMovement = false
        this.collide = false
        this.detectPlayer = false
        this.enemyHit = false
        this.cooldown = false
        this.enemyHitText = false
        this.floatingNumber = 0
        this.floatingTextArray = []
        this.floatingTextMovableEnabler = false
        this.shadow = new Image;
        this.shadow.src = 'images/shadow.png'
        this.shadowOn = true
        this.grassColide = false
        this.grassCheck = false
        this.currentHpBar = this.enemyTextWidthHpBar*2
        
        this.name = this.rarityOnName + ' Slime'
        this.enemyTextWidth = c.measureText(this.name).width;
        this.enemyTextWidthHpBar = 40

        this.oneTimeText = false
        this.deathAnimationActivated = false
        this.firstTimeEffects = true

        this.detectionRange = 400
        this.maxHp = 100
        this.speed = 2
        this.dropTable = [slime,bronzeCoin,stick,dagger]
        this.dropTableChance = [100,10,20,2]
        this.dropTableAmmount = [1,10,1,1]
        this.rarityBoost = 0
        this.dropBoost = 0
        this.calculateEnemyHpBar()

    }
    else if(type=='skeleton'){
        this.image.src = "images/SlimeEnemy/Idle/GreenIdle.png"
    }
    if(this.rarity=='unique'){
      this.maxHp = this.maxHp * 5
      this.enemySpeed = 5
      this.fontTextColor = '#d16f19'
 
    }
    else if (this.rarity=='yellow'){
      this.maxHp = this.maxHp * (Math.round(Math.random()*2)+2)
      this.enemySpeed = 4
      this.fontTextColor = '#a3981f'
    }
    else if (this.rarity=='blue'){
      this.enemySpeed = 3
      this.maxHp = this.maxHp * 1,5
      this.fontTextColor = 'blue'
    }
    else if (this.rarity=='white'){
      this.enemySpeed = 2
      this.maxHp = this.maxHp
      this.fontTextColor = 'black'
    }
        this.currentHp = this.maxHp
        this.active = true
    
  }
  draw(){

    this.detectionRangeObject = {
      x : this.position.x-this.detectionRange/2,
      y : this.position.y-this.detectionRange/2,
      width : this.width+this.detectionRange,
      height : this.height+this.detectionRange

  }
    //c.fillStyle = 'blue'
    //c.fillRect(this.detectionRangeObject.x,this.detectionRangeObject.y,this.detectionRangeObject.width,this.detectionRangeObject.height)
    //c.fillStyle = 'green'
    //c.fillRect(this.position.x,this.position.y,this.width,this.height)
    //c.drawImage(image,koordynaty poczatkowe klatka x, koordynaty poczatkowe klatka y , szerokosc klatki, wysokosc klatki, pozycja x, pozycja y, szerokosc docelowa, wysokosc docelowa)
    if (this.firstTimeEffects==true){
      this.calculateEnemyHpBar()
      this.firstTimeEffects = false
    }
    if(this.active){
      if(this.shadowOn){
        c.globalAlpha = 0.4;
        c.drawImage(this.shadow,this.position.x-5,this.position.y+25,70,20)
        c.globalAlpha = 1;
      }
      if(!this.grassColide){
        c.drawImage(this.image,this.srcX,this.srcY,this.spriteWidth,this.spriteHeight,this.position.x-50,this.position.y-20,150,60)
      }
      else if (this.grassColide){
        c.drawImage(this.imageInGrass,this.position.x,this.position.y,this.spriteWidth,this.spriteHeight)
      }
      if(!stopAll){
        this.enemyAnimation()
        if(!this.detectPlayer){
          this.enemyMovementRandom()
        }
      
        this.enemyDetectAttack()
        this.enemyMovementAttack()
        this.playerHitEnemyDetect()
        this.detectGrassCollision()
        this.calculateEnemyHpBar()
        //this.collideWithEnemies()
        if(this.highlithedStats){
          v.fillStyle = 'white'
          v.fillRect(this.position.x+28-(this.enemyTextWidth), this.position.y-38,this.enemyTextWidth*2.4,24)
          v.fillStyle = 'red'
          v.fillRect(this.position.x+28-38, this.position.y-12,this.enemyTextWidthHpBar*2,6)
          v.fillStyle = 'green'
          v.fillRect(this.position.x+28-38, this.position.y-12,this.currentHpBar,6)
         // v.strokeStyle = "black"; //Red
          //v.strokeText(this.name, this.position.x+28-(this.enemyTextWidth), this.position.y-18,10+(this.name.length*24),24);
          v.fillStyle = this.fontTextColor
          v.font = "24px serif";
          v.fillText(this.name, this.position.x+28-(this.enemyTextWidth), this.position.y-18,10+(this.name.length*24),24);


          //console.log(this.enemyTextWidth)
        }
      }


    }
      if(this.deathAnimationActivated){
        this.deathAnimation()
      }

    //console.log(this.position.x,this.position.y)  


    //console.log(this.randomXValue,this.randomYValue,this.position.x)
    
  //c.fillStyle = 'green'
  //c.fillRect(this.position.x,this.position.y,50,50)
  }
  detectGrassCollision(){
    if(allLoaded){
      for (let i = 0 ; i < grassArray.length; i++){
        const grass = grassArray[i]
        if(
          detectCollision3({
            object1:this,
            object2:{...grass}
          })
        ){
          this.shadowOn = false
          this.grassColide = true
          break
        }
        else{
          this.grassColide = false
          this.shadowOn = true
        }
      }
    }
    }
    calculateEnemyHpBar(){
      this.maxHpBarPercent = this.maxHp * 0.01;
      this.currentHpBarPercent = this.currentHp / this.maxHpBarPercent;
      this.currentHpBar = (this.currentHpBarPercent *0.01) * (this.enemyTextWidthHpBar*2)

    }  
  drawDmgText(){
    this.floatingTextArray.forEach((TextArray) =>{
      TextArray.draw()
  })
  }
  playerHitEnemyDetect(){
    if(detectCollision({
      object1:player.detectionPlayerAttackRangeObject,
      object2:this
    })&&!this.enemyHit&&player.weaponDraw){
      this.speed = this.speed *-1
      this.enemyHit = true
      player.damage = Math.floor(Math.random() * (player.maxDamage - player.minDamage + 1) + player.minDamage)
      this.currentHp -= player.damage
      this.playerDamage = player.damage
      this.enemyHitText = true
      this.calculateEnemyHpBar()

      if(this.currentHp<1){
        this.active = false
        this.floatingTextArray = []
        this.deathAnimation()
        this.srcX=0
        this.srcY=0
        this.currentFrame=0
        this.deathAnimationActivated=true
        this.calculateLootChance()
      }
      //console.log('enemy hit',player.knockback)
        setTimeout (()=>{
          this.speed = this.speed *-1
          
        },player.knockback)
        setTimeout (()=>{

          this.enemyHit = false
        },player.attackSpeed)
      }
      else{

      }
      if(this.enemyHitText){
        
        this.floatingTextArray.push(new FloatingText(this.position.x,this.position.y,this.playerDamage))
        this.enemyHitText = false
        //console.log(this.floatingTextArray)
        
      }
  }
  calculateLootChance(){
    this.lootChance = Math.round(Math.random()*100)
    //this.lootChanceAmmount = 'random'
    for(let i =0;i<this.dropTable.length;i++){
      if(this.lootChance <= this.dropTableChance[i]){
        if(this.dropTableAmmount[i]>1){
          this.lootChanceAmmount = Math.round(Math.random()*this.dropTableAmmount[i])
        }
        else if(this.dropTableAmmount[i]==1){
          this.lootChanceAmmount = 1
        }
        
        //createNewItemOnGround({itemId:this.dropTable[i],rarity:'random',ammount:this.lootChanceAmmount,tier:'random',position:{x:this.position.x+10,y:this.position.y+10}})
        createNewItemOnGround({itemId:this.dropTable[i],rarity:'random',ammount:this.lootChanceAmmount,tier:'random',position:{x:this.position.x+Math.round(Math.random()*30)-15,y:this.position.y+Math.round(Math.random()*40)-20}})
        //console.log('wylosowalo',this.lootChance,i,this.dropTableChance[i])
      }
      else{
        //console.log('nie wylosowalo',this.lootChance,i,this.dropTableChance[i])
      }
      
      //this.dropTable[0+i]
    }
    //this.dropTable = [slime,bronzeCoin,stick,dagger]
    //this.dropTableChance = [100,10,20,2]
    //createNewItemOnGround({itemId:'random',rarity:'random',ammount:'random',tier:'random'})
  }
  deathAnimation(){
    

    c.drawImage(this.imageDeath,this.srcX,this.srcY,this.spriteWidth,this.spriteHeight,this.position.x-50,this.position.y-20,150,60)
    if(this.currentFrame<9){
      this.currentFrame = this.currentFrame % 9
      this.srcX = this.currentFrame * 96
      this.slowerFrame++
    }

    if(this.slowerFrame > 6){
      this.currentFrame++
      this.slowerFrame = 0
    }

  }
  enemyDetectAttack(){
    if(detectCollision2({
      object1:this.detectionRangeObject,
      object2:player
    })){
        this.detectPlayer = true
        this.attacking = true
      }
      else if(this.attacking){
        console.log('timeout')
        setTimeout (()=>{
          if(!this.attacking){
            this.detectPlayer = false

            console.log('timeout ended')
          }

      },5000)
      }
      if(!detectCollision2({
        object1:this.detectionRangeObject,
        object2:player
      })){

          this.attacking = false
        }
  }
  enemyAnimation(){
    if(this.enemyIdle){
      this.currentFrame = this.currentFrame % this.totalFramesIdle
      this.srcX = this.currentFrame * 96
      this.slowerFrame++
      if(this.slowerFrame > 5){
        this.currentFrame++
        this.slowerFrame = 0
      }
  }
  }
  enemyMovementRandom(){
  if(!this.randomMovement&&!this.collide&&!this.detectPlayer&&!stopAll){
      this.randomMovement=true
      this.randomXValue = Math.round((Math.random()*2)-1)
      this.randomYValue = Math.round((Math.random()*2)-1)


      //this.translate3dValue = 'translate3d('+this.positionX+'px,'+this.positionY+'px,)';
      //this.style.transform = this.translate3dValue
      //console.log(this.randomMovement)
      setTimeout (()=>{
          this.randomMovement = false
          //console.log(this.randomXValue,this.randomYValue)
      },2000)
  }
  if(!this.collide){
    this.position.x = this.position.x - this.randomXValue
    this.position.y = this.position.y - this.randomYValue

  }
  this.x = this.position.x
  this.y = this.position.y
  for (let i = 0 ; i < blocks.length; i++){
    const block = blocks[i]
    if(
      detectCollision({
        object1:this,
        object2:{...block, position: {
          x: block.position.x ,//problem
          y: block.position.y ,
        }}
      })
    ){
      //console.log('collide')
      this.collide = true
      this.collide2 = true
      //console.log(this.collide)
      this.position.x = this.position.x - (this.randomXValue*-1)
      this.position.y = this.position.y - (this.randomYValue*-1)
      setTimeout (()=>{
        this.collide = false
  
        //console.log(this.collide)
      },2000)
    }
  }
  }
  collideWithEnemies(){

    for (let i = 0 ; i < enemies.length; i++){
      const enemy = enemies[i]
      if (enemy==this){

      }
      else{
        if(
          detectCollision3({
            object1:this,
            object2:enemy,position:{
              x: enemy.position.x - 4 ,
              y: enemy.position.y - 4
            }
            
          })
        ){
          this.moving = false
          //this.speed = this.speed *-1
        }
        else{
          
          //this.speed = this.enemySpeed
        }
      }
 
    }
  }
  enemyMovementAttack(){  
  this.x = this.position.x
  this.y = this.position.y

    //this.collideWithEnemies()
      if(this.detectPlayer){
        this.moving = true
        this.blockRight = false
        this.blockDown = false
        this.blockLeft = false
        this.blockUp = false
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
              //console.log('kolizja sie odpala')
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
                console.log('kolizja prawo')
                //console.log('block')      
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
                console.log('kolizja dol') 
                break      
              }


            }
          }

            //console.log(this.moving)
            //console.log('prawoDol')
            
            if(this.moving){
              if(!this.blockRight){
                this.position.x += this.enemySpeed
              }
              if(!this.blockDown){
                this.position.y += this.enemySpeed
              }
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
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x + 4 ,
                    y: block.position.y 
                  }}
                })
              ){
                
                this.blockLeft = true
                //console.log('block')
                
              }
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x  ,
                    y: block.position.y + 4
                  }}
                })
              ){
                this.blockUp = true
                //console.log('block')
                
              }
              else if(this.blockLeft||this.blockUp){
                break
              }
            }
          }

            //console.log(this.moving)
            //console.log('prawoDol')
            if(this.moving){
              if(!this.blockLeft){
                this.position.x -= this.enemySpeed
              }
              if(!this.blockUp){
                this.position.y -= this.enemySpeed
              }
            }

        }
        //rightTop
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
                
              }
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x  ,
                    y: block.position.y + 4
                  }}
                })
              ){
                this.blockUp = true
                
              }
              else if(this.blockRight||this.blockUp){
                break
              }
            }
          }

            if(!this.blockRight){
              this.position.x += this.enemySpeed
            }
            if(!this.blockUp){
              this.position.y -= this.enemySpeed
            }
          
        }   
        //leftDown
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
              if(
                detectCollision({
                  object1:this,
                  object2:{...block, position: {
                    x: block.position.x + 4 ,
                    y: block.position.y 
                  }}
                })
              ){
                
                this.blockLeft = true
                
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
                break
              }

            }
          }

            if(!this.blockLeft){
              this.position.x -= this.enemySpeed
            }
            if(!this.blockDown){
              this.position.y += this.enemySpeed
            }
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

function enemyShowNameHp(event){
  enemies.forEach((enemy)=>{
    if(event.clientX<enemy.position.x-enemy.width+140&&
      event.clientX>enemy.position.x&&
      event.clientY>enemy.position.y&&
      event.clientY<enemy.position.y+enemy.height+10){
        enemy.highlithedStats = true
      }
      else{
        enemy.highlithedStats = false
      }
  }
  )


}

