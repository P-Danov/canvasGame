class Player{
    constructor(x,y,width,height,color,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.weaponCooldown = false;
        this.weaponDraw = false;
        this.equiped = 'nothing'
        this.shadow = new Image;
        this.shadow.src = 'images/shadow.png'
        this.shadowOn = true
        this.cameraBox = {
          position: {
            x:this.x,
            y:this.y
          },
          width:1100,
          height:650,
        }
        this.detectionPlayerAttackRangeObject = {
          x : this.attackDirectionX,
          y : this.attackDirectionY,
          width : this.heightRange,
          height : this.heightRange
    
        }
        this.attackRange = 0.4

        this.strength = 10

          this.minDamage = 0 + equipedWeaponDamage.min
          this.maxDamage = 1 + equipedWeaponDamage.max
          this.knockback = 10*this.strength
          this.damage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1) + this.minDamage)
          
          this.carryWeight = this.strength*20

        this.endurance = 10
          this.maxHp = 25 + this.endurance*10
          //this.defence = this.endurance*3
          this.physicalDefence = this.endurance*1

        this.intelligence = 10
          this.maxMp = 25 + this.intelligence*10
          this.magicalDefence = this.intelligence*1
          this.destructionSkill
          this.summoningSkill
          this.necromancySkill

        this.agility = 10
          this.attackSpeed = 500
          this.rangedDamage
          this.evasion
          this.speed

        this.charisma = 10

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
      if(this.shadowOn&&!colideGrassShadow){
        c.globalAlpha = 0.4;
        c.drawImage(this.shadow,this.x-5,this.y+25,50,20)
        c.globalAlpha = 1;
      }

  }

    update(){
      this.cameraBox = {
        position: {
          x:this.x - 700,// 500
          y:this.y - 400 // 280
        },
        width:1400,//1100
        height:800,//650
      }
    }
    attack(){
    if (keySpace&&!this.weaponCooldown){
      if(currentDirection == 'right'){
        this.attackDirectionX = player.x + 50
        this.attackDirectionY = player.y
        this.widthRange = 50*player.attackRange
        this.heightRange = 50
        attackSrcY=100
        srcX=504
      }
      else if(currentDirection == 'left'){
        this.attackDirectionX = player.x - 50*this.attackRange
        this.attackDirectionY = player.y
        this.widthRange = 50*player.attackRange
        this.heightRange = 50
        attackSrcY=0
        srcX=504
      }
      else if(currentDirection == 'top'){
        this.attackDirectionX = player.x -5
        this.attackDirectionY = player.y -58*this.attackRange
        this.widthRange = 50
        this.heightRange = 50*player.attackRange
        attackSrcY=300
        srcX=504
      }
      else if(currentDirection == 'bottom'){
        this.attackDirectionX = player.x -5
        this.attackDirectionY = player.y +40
        this.widthRange = 50
        this.heightRange = 50*player.attackRange
        attackSrcY=200
        srcX=504
        startedBottom=true
      }
      this.detectionPlayerAttackRangeObject = {
        x : this.attackDirectionX,
        y : this.attackDirectionY,
        width : this.widthRange,
        height : this.heightRange
  
    }
      console.log('attack')
      this.weaponCooldown = true
      this.weaponDraw = true
    //    setTimeout (()=>{
    //      this.weaponDraw = false
    //  },1)
      setTimeout (()=>{
        this.weaponCooldown = false
    },this.attackSpeed)
    }}
}



