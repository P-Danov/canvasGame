class ItemOnGround{
    constructor({content,position}){
        this.image = new Image
        this.image.src = 'images/bag2.png'
        this.imageGrass = new Image
        this.imageGrass.src = 'images/bagGrass.png'
        this.imageText = new Image
        this.imageText.src = 'images/itemTextOnGround.png'
        this.position = position
        this.width = 30
        this.height = 30
        this.content = content
        this.shadow = new Image;
        this.shadow.src = 'images/shadow.png'
        this.shadowOn = true
        this.grassColide = false
        this.grassCheck = false
        this.showContentText = false
        this.contentSign = this.content.stackable?this.content.name+' '+this.content.ammount:this.content.name;
        
    }
    draw(){
        if(this.shadowOn&&!this.grassColide){
            c.globalAlpha = 0.4;
            c.drawImage(this.shadow,this.position.x+5,this.position.y+20,30,15)
            c.globalAlpha = 1;
          }
        if(!this.grassColide){
            c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        }
        else if(this.grassColide){
            c.drawImage(this.imageGrass,this.position.x,this.position.y,this.width,this.height)
        }
        this.showBagContent()
        this.checkIfInGrass()
        if(this.showContentText&&!inventoryOpen){
            v.fillStyle = 'white'

            
            v.drawImage(this.imageText,this.position.x-30,this.position.y-30,9*this.content.wholeName.length+10,20)
            v.fillStyle = 'black'
            v.font = "16px serif";
            v.fillText(this.content.wholeName, this.position.x-19,this.position.y-15);

        }
    }

    showBagContent(){
        if(!inventoryOpen){
        if(detectCollision({object1:player,object2:this})){
            this.showContentText = true

            //console.log(this.contentSign)
        }
        else{
            this.showContentText = false
        }
      }
    }

    checkIfInGrass(){
        if(!this.grassCheck){
            this.grassCheck = true
            

                for (let i = 0 ; i < grassArray.length; i++){
                  const grass = grassArray[i]
                  if(
                    detectCollision3({
                      object1:this,
                      object2:{...grass}
                    })
                  ){
                    this.grassColide = true
                    break
                  }
                }
        
    }
}
}

let itemIndex = 0
class Item{

    constructor({position,dimensions},beginningBlockArray,{name,type,ammount,minDamage,maxDamage,attackSpeed,attackRange,weight,
        damageSource,attackType,rarity,knockback,imageSRC,defence,armorType}){
        this.position = position
        this.dimensions = dimensions
        this.width = 57 * this.dimensions.x
        this.height = 49 * this.dimensions.y
        this.size = this.dimensions.x * this.dimensions.y
        if(this.size==1){
            this.width -= 2
            this.height -= 2
        }
        this.pickedUp = false
        this.firstTimeRender = true
        this.stackDivideOptionCalculation;
        this.stackDivideOption = false
        this.objectThis = this
        this.hoverOn = false
        this.loaded = false
        this.active = true
        this.image = new Image()
        this.name = name
        this.type = type
        this.equiped = false
       
        this.image.src = 'images/equipment/'+this.type+'/'+this.name+'.png'
        this.imageSRC=imageSRC

        this.itemOnGrid=[];
        this.beginningBlockArray = beginningBlockArray
        this.created = false
        this.currentItemDraw = false

        
        this.ammount = ammount
        this.newAmmount = 0
        if(this.name==='Gold Coin'||this.name==='Silver Coin'||this.name==='Bronze Coin'){
            this.ammountText=' x '+this.ammount
            this.maxStack = 1000
            this.stackable = true
        }
        else if (this.name==='Potion'||this.name==='Slime'){
            this.ammountText=' x '+this.ammount
            this.maxStack = 10
            this.stackable = true
        }
        else{
            this.maxStack = 1
            this.ammountText=''
            this.stackable = false
        }
        this.wholeName = this.name + this.ammountText
        this.newWholeName = this.name +' x '+this.newAmmount

        this.sliderPositionX = this.position.x-271
        this.sliderPositionY = this.position.y+70
        this.sliderWidth = 20
        this.sliderCollideWidth = 10
        this.sliderHeight = 40
        this.minSliderWidth = this.sliderPositionX +10
        this.maxSliderWidth = this.sliderPositionX + 210
        this.sliderPositionXAmmount = 5;
        this.sliderBar = {
            x:this.position.x-271,
            y:this.position.y+70,
            width:210,
            height:5,
        }
        this.barPick = false
        this.cancelAmmount = 0

        this.minDamage = minDamage
        this.maxDamage = maxDamage
        this.attackSpeed = attackSpeed
        this.attackRange = attackRange
        this.weight = weight
        this.damageSource = damageSource
        this.attackType = attackType
        this.knockback = knockback

        this.defence = defence
        this.armorType = armorType

        this.rarity = rarity
        




        this.infoCellDamage = 'Damage : '+minDamage+' - '+maxDamage
        this.infoCellAttackSpeed = 'Attack Speed : '+this.attackSpeed
        this.combinedWeight = this.weight*this.ammount
        this.infoCellWeight = 'Weight : '+(this.combinedWeight.toFixed(2))

        this.infoCellArmor = 'Physical Defense : '+this.defence+'%'
        this.infoCellType = 'Armor Type : '+this.armorType
//Number()
//toString()

    }
    draw(){
        if(this.active){  
                if(this.currentItemDraw){
                    v.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
                }
                else{
                    c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
                }
                if(this.hoverOn&&!currentItemOn&&!this.stackDivideOption){
                    if(this.name==='Gold Coin'||this.name==='Silver Coin'||this.name==='Bronze Coin'||this.type==='otherItems'){
                        infoCell.height = 200
                    }
                    else{
                        infoCell.height = 400
                    }
                    if(!this.equiped){
                        v.drawImage(infoCell,this.position.x-300,this.position.y-70,infoCell.width,infoCell.height)
                        v.fillStyle = 'black'
                        v.font = "bold 20px serif";
                        v.fillText(this.wholeName, this.position.x-160-((this.wholeName.length*5)),this.position.y+60-70);
                        v.font = "bold 16px serif";
                        if(this.type=='weapon'){
                            v.fillText(this.infoCellDamage, this.position.x-260,this.position.y+60-40);
                            v.fillText(this.infoCellAttackSpeed, this.position.x-260,this.position.y+60-20);
                            v.fillText(this.infoCellWeight, this.position.x-200,this.position.y+60+240);
                        }
                        else if(this.type=='bodyArmor'||this.type=='helmet'||this.type=='gloves'||this.type=='boots'||this.type=='belt'){
                            v.fillText(this.infoCellArmor, this.position.x-260,this.position.y+60-40);
                            v.fillText(this.infoCellType, this.position.x-260,this.position.y+60-20);
                            v.fillText(this.infoCellWeight, this.position.x-200,this.position.y+60+240);
                        }
                        else if(this.type=='otherItems'){
                            v.fillText(this.infoCellWeight, this.position.x-210,this.position.y+60+40);
                        }
                        else if(this.type=='jewellery'){

                        }


                    }
                    else{
                        v.drawImage(infoCell,this.position.x+140,this.position.y-70,infoCell.width,infoCell.height)
                        v.fillStyle = 'black'
                        v.font = "bold 20px serif";
                        v.fillText(this.wholeName, this.position.x+280-((this.wholeName.length*5)),this.position.y+60-70);
                        v.font = "bold 16px serif";

                        if(this.type=='weapon'){
                            v.fillText(this.infoCellDamage, this.position.x+180,this.position.y+60-40);
                            v.fillText(this.infoCellAttackSpeed, this.position.x+180,this.position.y+60-20);
                            v.fillText(this.infoCellWeight, this.position.x+240,this.position.y+60+240);
                        }
                        else if(this.type=='bodyArmor'||this.type=='helmet'||this.type=='gloves'||this.type=='boots'||this.type=='belt'){
                            v.fillText(this.infoCellArmor, this.position.x+180,this.position.y+60-40);
                            v.fillText(this.infoCellType, this.position.x+180,this.position.y+60-20);
                            v.fillText(this.infoCellWeight, this.position.x+240,this.position.y+60+240);
                        }
                        else if(this.type=='otherItems'){
                            v.fillText(this.infoCellWeight, this.position.x-210,this.position.y+60+40);
                        }
                        else if(this.type=='jewellery'){

                        }
                    }

                }
                if(this.stackDivideOption){
                    this.drawingStackDivider()
                }
        }
    }
    draw2(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
//=====================================ekran do dzielenia itemow=====================================
    drawingStackDivider(){
        infoCell.height = 200
        v.drawImage(infoCell,this.position.x-300,this.position.y-70,infoCell.width,infoCell.height)
        v.fillStyle = 'black'
        v.font = "20px serif";
        v.fillText('Old Stack', this.position.x-160-((this.wholeName.length*5)),this.position.y-30);
        v.fillText(this.wholeName, this.position.x-160-((this.wholeName.length*5)),this.position.y-10);
        v.fillText('New Stack', this.position.x-160-((this.wholeName.length*5)),this.position.y+20);
        v.fillText(this.newWholeName, this.position.x-160-((this.wholeName.length*5)),this.position.y+40);
        v.fillStyle = 'black'
        v.fillRect(this.position.x-271,this.position.y+70,this.sliderBar.width,this.sliderBar.height)
        v.fillStyle = 'white'
        v.drawImage(slider,this.sliderPositionX,this.sliderPositionY,this.sliderWidth,this.sliderHeight)
            if(acceptButtonHover){
                v.drawImage(acceptButtonHiglited,this.position.x-245,this.position.y+90,60,30)
            }
            else{
                v.drawImage(acceptButton,this.position.x-245,this.position.y+90,60,30)
            }
            if(cancelButtonHover){
                v.drawImage(cancelButtonHiglited,this.position.x-145,this.position.y+90,60,30)
            }
            else{
                v.drawImage(cancelButton,this.position.x-145,this.position.y+90,60,30)
            }

        
        //v.fillStyle = 'red'
        //v.fillRect(currentItemOnHoverStacks.sliderPositionX,currentItemOnHoverStacks.sliderPositionY,currentItemOnHoverStacks.sliderHeight,currentItemOnHoverStacks.sliderColliderWidth+20)
    }
//=====================================dodanie zajetych miejsc przy tworzeniu itemu=====================================
    addingToItemOnGridArray(){
        if(!this.created){
            inventories.forEach((inventories)=>{
                for(let i = 0;i<this.beginningBlockArray.length;i++){
                    if (inventories.index==this.beginningBlockArray[i]){
                        this.itemOnGrid.push(inventories)
                    }
                }
    
                })
                this.created=true
        }

    }
}
function moveStackSlider(event){
    if(startHovering){

        if(mouseIsDown&&event.clientX<currentItemOnHoverStacks.sliderPositionX+currentItemOnHoverStacks.sliderColliderWidth+20&&
            event.clientX>currentItemOnHoverStacks.sliderPositionX&&
            event.clientY>currentItemOnHoverStacks.sliderPositionY&&
            event.clientY<currentItemOnHoverStacks.sliderPositionY+currentItemOnHoverStacks.sliderHeight){
                console.log('colide')
                currentItemOnHoverStacks.barPick = true
            }
            else if(!mouseIsDown){
                currentItemOnHoverStacks.barPick = false
            }


            if(currentItemOnHoverStacks.barPick){
                if(event.clientX>currentItemOnHoverStacks.sliderPositionX+10){
                    if(currentItemOnHoverStacks.sliderPositionX+10<currentItemOnHoverStacks.maxSliderWidth&&currentItemOnHoverStacks.ammount>1){
                        
                        currentItemOnHoverStacks.sliderPositionX += currentItemOnHoverStacks.sliderPositionXAmmount
                        currentItemOnHoverStacks.ammount -=currentItemOnHoverStacks.stackDivideOptionCalculation
                        currentItemOnHoverStacks.newAmmount +=currentItemOnHoverStacks.stackDivideOptionCalculation
                        //console.log('1')
                    }

                }
                else if(event.clientX<currentItemOnHoverStacks.sliderPositionX+10){
                    if(currentItemOnHoverStacks.sliderPositionX+10>currentItemOnHoverStacks.minSliderWidth){
                        currentItemOnHoverStacks.sliderPositionX -= currentItemOnHoverStacks.sliderPositionXAmmount
                        currentItemOnHoverStacks.ammount +=currentItemOnHoverStacks.stackDivideOptionCalculation
                        currentItemOnHoverStacks.newAmmount -=currentItemOnHoverStacks.stackDivideOptionCalculation
                        //console.log('2')
                    }

                }
                if(currentItemOnHoverStacks.ammount<1){
                    currentItemOnHoverStacks.sliderPositionX -= currentItemOnHoverStacks.sliderPositionXAmmount
                    currentItemOnHoverStacks.ammount +=currentItemOnHoverStacks.stackDivideOptionCalculation
                    currentItemOnHoverStacks.newAmmount -=currentItemOnHoverStacks.stackDivideOptionCalculation
                }
                if(currentItemOnHoverStacks.stackable){
                    currentItemOnHoverStacks.ammountText=' x '+currentItemOnHoverStacks.ammount
                    currentItemOnHoverStacks.wholeName = currentItemOnHoverStacks.name + currentItemOnHoverStacks.ammountText
                    currentItemOnHoverStacks.ammountText=' x '+currentItemOnHoverStacks.newAmmount
                    currentItemOnHoverStacks.newWholeName = currentItemOnHoverStacks.name + currentItemOnHoverStacks.ammountText
                }

                
            }

                
        
    }

}
function clickAcceptOrCancel(event){
    if(startHovering){
        if(currentItemOnHoverStacks.stackDivideOption&&event.clientX<currentItemOnHoverStacks.position.x-245+60&&
            event.clientX>currentItemOnHoverStacks.position.x-245&&
            event.clientY>currentItemOnHoverStacks.position.y+90&&
            event.clientY<currentItemOnHoverStacks.position.y+90+30){
                console.log('accept')
                if(currentItemOnHoverStacks.newAmmount>=1){
                    dimensionX=currentItemOnHoverStacks.dimensions.x
                    dimensionY=currentItemOnHoverStacks.dimensions.y
                    checkGridAvailability(dimensionX,dimensionY)
                    if(spaceAvailabile){
                        lameCalculations()
                        items.push(new Item({position:{x:newItemPositionX,y:newItemPositionY},dimensions:{x:currentItemOnHoverStacks.dimensions.x,y:currentItemOnHoverStacks.dimensions.y}},
                          beginningBlockArray,
                          {name:currentItemOnHoverStacks.name,type:currentItemOnHoverStacks.type,ammount:currentItemOnHoverStacks.newAmmount,
                            rarity:currentItemOnHoverStacks.rarity,
                            minDamage:currentItemOnHoverStacks.minDamage,
                            maxDamage:currentItemOnHoverStacks.maxDamage,
                            weight:currentItemOnHoverStacks.weight,
                            attackSpeed:currentItemOnHoverStacks.attackSpeed,
                            attackRange:currentItemOnHoverStacks.attackRange,
                            damageSource:currentItemOnHoverStacks.damageSource,
                            attackType:currentItemOnHoverStacks.attackType,}))
                          currentItemOnHoverStacks.stackDivideOption = false
                          lockInventory = false
                          currentItemOnHoverStacks.hoverOn = false
                          currentItemOnHoverStacks.newAmmount = 0
                          let currentCombinedWeight = currentItemOnHoverStacks.weight*currentItemOnHoverStacks.ammount
                          currentItemOnHoverStacks.infoCellWeight = 'Weight : '+(currentCombinedWeight.toFixed(2))
                      }
                      else{
                        console.log('nie ma miejsca')
                      }
    
                }
          
                  else if(currentItemOnHoverStacks.newAmmount<1){
                    console.log('musi byc wiecej niz zero')
                  }

        }
        else if(currentItemOnHoverStacks.stackDivideOption&&event.clientX<currentItemOnHoverStacks.position.x-145+60&&
            event.clientX>currentItemOnHoverStacks.position.x-145&&
            event.clientY>currentItemOnHoverStacks.position.y+90&&
            event.clientY<currentItemOnHoverStacks.position.y+90+30){
                console.log('cancel')
                currentItemOnHoverStacks.ammount = currentItemOnHoverStacks.cancelAmmount
                currentItemOnHoverStacks.newAmmount = 0
                currentItemOnHoverStacks.stackDivideOption = false
                lockInventory = false
                currentItemOnHoverStacks.hoverOn = false
  

        }
        if(currentItemOnHoverStacks.stackable){
            currentItemOnHoverStacks.ammountText=' x '+currentItemOnHoverStacks.ammount
            currentItemOnHoverStacks.wholeName = currentItemOnHoverStacks.name + currentItemOnHoverStacks.ammountText
            currentItemOnHoverStacks.ammountText=' x '+currentItemOnHoverStacks.newAmmount
            currentItemOnHoverStacks.newWholeName = currentItemOnHoverStacks.name + currentItemOnHoverStacks.ammountText
        }


    }


}
//=====================================hoverowanie nad itemem=====================================
function hoverOnItem(event){
    actualRect = document.getElementById("canvas").getBoundingClientRect()
    if (inventoryOpen&&!lockInventory){
        items.forEach((item)=>{
            if(event.clientX<(item.position.x+item.width)&&
               event.clientX-5>item.position.x&&
               event.clientY-8>item.position.y&&
               event.clientY<(item.position.y+item.height)&&!item.pickedUp)
               {
                startHovering = true
                firstHover = true
                item.hoverOn = true
                currentItemOnHover = item
                currentItemOnHoverStacks = item
                currentItemOnHoverStacks.sliderPositionX = currentItemOnHoverStacks.position.x-276
                currentItemOnHoverStacks.sliderPositionY = currentItemOnHoverStacks.position.y+52
                currentItemOnHoverStacks.minSliderWidth = currentItemOnHoverStacks.sliderPositionX +10
                currentItemOnHoverStacks.maxSliderWidth = currentItemOnHoverStacks.sliderPositionX + 210

               }
            else if(event.clientX<(item.position.x+item.width)*(actualRect.width/1224)&&
            event.clientX-5>item.position.x*(actualRect.width/1224)&&
            event.clientY-8>item.position.y*(actualRect.height/776)&&
            event.clientY<(item.position.y+item.height)*(actualRect.height/776)){
                    item.hoverOn = true
            }
            else if(event.clientX<(item.position.x+item.width)*(actualRect.width/1224)&&
            event.clientX-5>item.position.x*(actualRect.width/1224)&&
            event.clientY-8>item.position.y*(actualRect.height/776)&&
            event.clientY<(item.position.y+item.height)*(actualRect.height/776)){
                item.hoverOn = false
        }
            else {
                item.hoverOn = false
            }})
    }
}



function checkIfValidItem(event){   
    if(inventoryOpen){
//=====================================dzielenie stacków itemów=====================================
        if(firstHover){
            if(event.ctrlKey&&!currentItemOn&&currentItemOnHoverStacks.stackable&&!lockInventory&&currentItemOnHoverStacks.hoverOn){
                console.log('control')
                lockInventory = true
                currentItemOnHoverStacks.cancelAmmount = currentItemOnHoverStacks.ammount
                currentItemOnHoverStacks.stackDivideOption = true
                currentItemOnHoverStacks.stackDivideOptionCalculation = Math.ceil(currentItemOnHoverStacks.ammount/40)

                if(currentItemOnHoverStacks.ammount<40){
                    currentItemOnHoverStacks.sliderPositionXAmmount = 200/currentItemOnHoverStacks.ammount
                    currentItemOnHoverStacks.sliderColliderWidth = 10
                }

                else{
                    currentItemOnHoverStacks.sliderPositionXAmmount = 5
                    currentItemOnHoverStacks.sliderColliderWidth = 10
                }
                

                
                //currentItemOnHoverStacks.sliderPositionXAmmount = 200/currentItemOnHoverStacks.ammount
                console.log(currentItemOnHoverStacks.stackDivideOptionCalculation)
            }
        }

//=====================================podniesienie itemu=====================================
        if(!currentItemOn&&!event.ctrlKey&&!lockInventory&&!disabled){
            items.forEach((item)=>{
                if(event.clientX<item.position.x+item.width*(actualRect.width/1224)&&
                   event.clientX>item.position.x*(actualRect.width/1224)&&
                   event.clientY>item.position.y*(actualRect.height/776)&&
                   event.clientY<item.position.y+item.height*(actualRect.height/776))
                   {
                            if(!item.pickedUp){
                                currentItemOnHover={};
                                item.pickedUp = true
                                currentItem = item
                                currentItemOn = true
                                currentItem.currentItemDraw = true
                                currentItem.position.x = event.clientX - (currentItem.width/2);
                                currentItem.position.y = event.clientY - (currentItem.height/2);
                                currentItem.addingToItemOnGridArray()
                                currentItem.itemOnGrid.forEach((currentGriddd)=>{
                                    currentGriddd.freeSlot = true
                                    inventoryGridArray.splice(currentGriddd.index,1, 0) 
                                })
                                
       
                            }
                    }
            })

        }

//=====================================polozenie itemu=====================================
        else if (currentItemOn&&!event.ctrlKey&&!lockInventory&&!disabled){ 

            inventories.forEach((inventoriess)=>{
                if(currentItem.position.x<inventoriess.collisionObject.x+inventoriess.collisionObject.width+1&&
                   currentItem.position.x+currentItem.width+1>inventoriess.collisionObject.x&&
                   currentItem.position.y+currentItem.height+1>inventoriess.collisionObject.y&&
                   currentItem.position.y<inventoriess.collisionObject.y+inventoriess.collisionObject.height+1&&inventoriess.freeSlot)
                   {
                    currentGrid.push(inventoriess)  // tworzenie tabeli i iteracja od 1-6 slotow w ekwipunku
                    gridFreeSlotCheck = 0
                    currentGrid.forEach((currentGridd)=>{
                        if(currentGridd.freeSlot){
                            gridFreeSlotCheck ++
                            }
                            })
                        if(gridFreeSlotCheck==currentItem.size){
                        gridFreeSlotCheck = 0
                        currentGrid.forEach((currentGridd)=>{   // iteracja zajmowanie slotow
                            currentGridd.freeSlot = false
                            inventoryGridArray.splice(currentGridd.index,1, 1)
                            })
                        let firstFromArray = currentGrid[0]    // first block position for alligment
                        currentItem.position.x = firstFromArray.position.x
                        currentItem.position.y = firstFromArray.position.y
                        currentItem.pickedUp = false
                        currentItemOn = false
                        currentItem.currentItemDraw = false
                        currentItem.itemOnGrid = currentGrid  // przypisanie slotow do itemu
                        currentGrid =[]
                        currentItemOnHover={};
                        console.log('polozenie')
                      }
                   }
            })
            
//=====================================wymiana stackow=====================================
            if (currentItem.name===currentItemOnHover.name&&currentItem.stackable&&currentItemOnHover.stackable&&!event.ctrlKey&&!lockInventory){

                if(currentItemOnHover.ammount<currentItemOnHover.maxStack){

                    if(currentItem.position.x<currentItemOnHover.position.x+currentItemOnHover.width&&
                        currentItem.position.x+currentItem.width>currentItemOnHover.position.x&&
                        currentItem.position.y+currentItem.height>currentItemOnHover.position.y&&
                        currentItem.position.y<currentItemOnHover.position.y+currentItemOnHover.height)
                {        
                    currentItemOnHover.ammount += currentItem.ammount 
                    currentItem.ammount -= currentItem.ammount
                    
                    if(currentItemOnHover.ammount>=currentItemOnHover.maxStack){
                        currentItem.ammount = currentItemOnHover.ammount - currentItemOnHover.maxStack  
                        currentItemOnHover.ammount -= currentItem.ammount
                    }
                    console.log(currentItemOnHover.ammount)
                    updateAmmount()

                    if(currentItem.ammount<=0){
                        itemIndex = items.indexOf(currentItem)
                        currentItem.addingToItemOnGridArray()
                        currentItem.itemOnGrid.forEach((currentGriddd)=>{
                            currentGriddd.freeSlot = true
                            inventoryGridArray.splice(currentGriddd.index,1, 0) 
                        })

                        currentItem.active = false
                        currentItem={}
                        currentItemOn = false
                        items.splice(itemIndex,1)
                    }}
                }
               }
            //console.log(currentItem.name,currentItemOnHover.name,currentItem.stackable,currentItemOnHover.stackable) 
            //console.log(currentItem.itemIndexInInventory)
            //console.log('erase current grid')     
            currentGrid =[]  
        }
//=====================================wyrzucenie itemu na ziemie=====================================
        if(event.clientX<1070+100&&
            event.clientX>1070&&
            event.clientY>620&&
            event.clientY<620+100&&currentItemOn&&!event.ctrlKey&&!lockInventory){


                    
                            itemIndex = items.indexOf(currentItem) 
                            //console.log('trash')
                            //currentItem.addingToItemOnGridArray()
                            currentItem.itemOnGrid.forEach((currentGriddd)=>{  //zwolnienie slotow z itemu
                                currentGriddd.freeSlot = true
                                inventoryGridArray.splice(currentGriddd.index,1, 0) 
                            })
                            currentItem.active = false
                            currentItem.pickedUp = false
                            currentItem.hoverOn = false
                            currentItem.currentItemDraw = false
                            currentItem.itemOnGrid = []   // usuniecie przypisanych slotow
                            currentItem.beginningBlockArray=[]  // usuniecie poczatkowej tabeli przypisanych slotow
                            itemsOnGround.push(new ItemOnGround({content:currentItem,position:{x:600+Math.round(Math.random()*20)-10,y:400+Math.round(Math.random()*20)-10}}))
                            movables = [...blocks,...grassArray,...enemies,startingAreaBackground,...trees,...itemsOnGround]
                            console.log(currentItem.ammount)
                            actualCarryWeight = actualCarryWeight - currentItem.weight*currentItem.ammount


                            showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight
                            currentItem={}
                            currentItemOn = false
                            items.splice(itemIndex,1)
                            //console.log('wyrzucenie')
                                         
        }
    }
}
function moveIfValidItem(event){
    if (currentItemOn){
            currentItem.position.x = event.clientX - (currentItem.width/2);
            currentItem.position.y = event.clientY - (currentItem.height/2);            
    }
}
function checkGridAvailability(dimensionX,dimensionY){

    for(let i = 0;i<inventoryGridArray.length;i++){

            if(dimensionY===1&&dimensionX===1&&inventoryGridArray[i]==0){
                beginningBlockArray=[i]
                inventoryGridArray[i]=1
                startingPointOnCreateItem = [i]
                spaceAvailabile = true
                notFreeSlot()
                break
            }
            if(dimensionY===2&&dimensionX===1&&inventoryGridArray[i]==0&&inventoryGridArray[i+10]==0){
                inventoryGridArray[i]=1; inventoryGridArray[i+10]=1;
                beginningBlockArray=[i,i+10]
                startingPointOnCreateItem = [i]
                spaceAvailabile = true
                notFreeSlot()
                break
            }
            if(dimensionY===3&&dimensionX===1&&inventoryGridArray[i]==0&&inventoryGridArray[i+10]==0&&inventoryGridArray[i+20]==0){
                inventoryGridArray[i]=1; inventoryGridArray[i+10]=1;inventoryGridArray[i+20]=1;
                beginningBlockArray=[i,i+10,i+20]
                startingPointOnCreateItem = [i]
                spaceAvailabile = true
                notFreeSlot()
                break
            }
            if(dimensionY===2&&dimensionX===2&&inventoryGridArray[i]==0&&inventoryGridArray[i+10]==0&&inventoryGridArray[i+1]==0&&inventoryGridArray[i+11]==0){
                if([i]!=9&&[i]!=19&&[i]!=29&&[i]!=39&&[i]!=49&&[i]!=59&&[i]!=69&&[i]!=79){
                inventoryGridArray[i]=1; inventoryGridArray[i+10]=1;inventoryGridArray[i+1]=1; inventoryGridArray[i+11]=1;
                beginningBlockArray=[i,i+1,i+10,i+11]
                startingPointOnCreateItem = [i]
                spaceAvailabile = true
                
                notFreeSlot()

                break
                }
            }
            if(dimensionY===3&&dimensionX===2&&inventoryGridArray[i]==0&&inventoryGridArray[i+1]==0&&inventoryGridArray[i+10]==0&&inventoryGridArray[i+11]==0&&inventoryGridArray[i+20]==0&&inventoryGridArray[i+21]==0){
                if([i]!=9&&[i]!=19&&[i]!=29&&[i]!=39&&[i]!=49&&[i]!=59&&[i]!=69&&[i]!=79){
                    inventoryGridArray[i]=1; inventoryGridArray[i+1]=1;inventoryGridArray[i+10]=1; inventoryGridArray[i+11]=1;inventoryGridArray[i+20]=1;inventoryGridArray[i+21]=1;

                    beginningBlockArray=[i,i+1,i+10,i+11,i+20,i+21]
                    
                    startingPointOnCreateItem = [i]
                    //console.log(startingPointOnCreateItem)
                    spaceAvailabile = true
                    notFreeSlot()
                    break
                }

            }
            if(dimensionY===1&&dimensionX===2&&inventoryGridArray[i]==0&&inventoryGridArray[i+1]==0){
                if([i]!=9&&[i]!=19&&[i]!=29&&[i]!=39&&[i]!=49&&[i]!=59&&[i]!=69&&[i]!=79){
                inventoryGridArray[i]=1; inventoryGridArray[i+1]=1;
                beginningBlockArray=[i,i+1]
                startingPointOnCreateItem = [i]
                spaceAvailabile = true
                notFreeSlot()
                break
                }
            }
        }

    }
    function notFreeSlot(){
        //console.log(inventoryGridArray[i])
        inventories.forEach((inventories)=>{
            for(let i = 0;i<beginningBlockArray.length;i++){
                if (inventories.index==beginningBlockArray[i]){
                    inventories.freeSlot=false

                }
            }

            })
    }
    function lameCalculations(){
        if(startingPointOnCreateItem<10){
          tempYPosition = 0
      
        }
        else if(startingPointOnCreateItem<20){
          tempYPosition = 50
          startingPointOnCreateItem -=10
        }
        else if(startingPointOnCreateItem<30){
          tempYPosition = 100
          startingPointOnCreateItem -=20
        }
        else if(startingPointOnCreateItem<40){
          tempYPosition = 150
          startingPointOnCreateItem -=30
        }
        else if(startingPointOnCreateItem<50){
          tempYPosition = 200
          startingPointOnCreateItem -=40
        }
        else if(startingPointOnCreateItem<60){
          tempYPosition = 250
          startingPointOnCreateItem -=50
        }
        else if(startingPointOnCreateItem<70){
          tempYPosition = 300
          startingPointOnCreateItem -=60
        }
        else if(startingPointOnCreateItem<80){
          tempYPosition = 350
          startingPointOnCreateItem -=70
        }
        newItemPositionX = inventoryStartingXPosition + (startingPointOnCreateItem*59)
        newItemPositionY = inventoryStartingYPosition + tempYPosition
        spaceAvailabile = false
      }
function updateAmmount(){
    currentItemOnHover.ammountText=' x '+currentItemOnHover.ammount
    currentItemOnHover.wholeName = currentItemOnHover.name + currentItemOnHover.ammountText
    currentItem.ammountText=' x '+currentItem.ammount
    currentItem.wholeName = currentItem.name + currentItem.ammountText
    currentItem.infoCellWeight = 'Weight : '+(currentItem.weight*currentItem.ammount)
    currentItemOnHover.infoCellWeight = 'Weight : '+(currentItemOnHover.weight*currentItemOnHover.ammount)
}
function takeBagContent(){
    if(!inventoryOpen){
        itemsOnGround.reverse().forEach((itemOnGround)=>{
            
            if(detectCollision({object1:player,object2:itemOnGround})){
                if(keyE){
                    //console.log('items length= '+items.length)
                    if(itemOnGround.content.stackable){
                        
                            for(let i=0;i<items.length;i++){
//================================podnoszenie itemu ze stackami i laczenie ich===================================================

                                //console.log(items[i].name,itemOnGround.content.name,'i='+i,'items lenght= '+items.length,typeof(items.length+1))

                                 if(items[i].name == itemOnGround.content.name&&itemOnGround.content.ammount <= (items[i].maxStack-items[i].ammount)){
                                    //200 <= 1000-200
                                    console.log(itemOnGround.content.ammount)
                                    items[i].ammount += itemOnGround.content.ammount 

                                    actualCarryWeight = actualCarryWeight + itemOnGround.content.weight*itemOnGround.content.ammount
                                    showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight

                                    itemOnGround.content.ammount -= itemOnGround.content.ammount

                                    items[i].ammountText=' x '+items[i].ammount
                                    items[i].wholeName = items[i].name + items[i].ammountText
                                    items[i].infoCellWeight = 'Weight : '+(items[i].weight*items[i].ammount)

                                    
                                    console.log('laczymy stack')
                                    break
                                    }

                                else if (items[i].name == itemOnGround.content.name&&items[i].ammount == items[i].maxStack){
                                        console.log('asdf')
                                        
                                    }  
                                else if(items[i].name == itemOnGround.content.name&&itemOnGround.content.ammount > (items[i].maxStack-items[i].ammount)){
                                    let moreThenMaxStack;
                                    //items 400
                                    //items on ground 800
                                    
                                    
                                    items[i].ammount = items[i].ammount + itemOnGround.content.ammount 
                                    moreThenMaxStack = items[i].ammount - items[i].maxStack
                                    
                                    //    1200                400                 800
                                    //console.log(items[i].ammount)
                                    
                                    //     200              1200               1000
                                    //console.log(moreThenMaxStack)
                                    items[i].ammount = items[i].maxStack
                                    //console.log(items[i].ammount)
                                    actualCarryWeight = actualCarryWeight + itemOnGround.content.weight*itemOnGround.content.ammount
                                    console.log(actualCarryWeight)
                                    showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight

                                    //console.log(itemOnGround.content.ammount)
                                    console.log(items[i].ammount)
                                    
                                    items[i].ammountText=' x '+items[i].ammount
                                    items[i].wholeName = items[i].name + items[i].ammountText
                                    items[i].infoCellWeight = 'Weight : '+(items[i].weight*items[i].ammount)

                                    itemOnGround.content.ammount = moreThenMaxStack
                                    console.log('itemOnGround.content.ammount',itemOnGround.content.ammount)
                                    dimensionX = itemOnGround.content.dimensions.x
                                    dimensionY = itemOnGround.content.dimensions.y
                                    checkGridAvailability(dimensionX,dimensionY)
                                    if(spaceAvailabile){
                                    lameCalculations()
                                    itemOnGround.content.position.x = newItemPositionX
                                    itemOnGround.content.position.y = newItemPositionY
                                    itemOnGround.content.created = false
                                    itemOnGround.content.active = true
                                    itemOnGround.content.beginningBlockArray = beginningBlockArray
                                    itemOnGround.content.addingToItemOnGridArray()
                                    //this.content.itemOnGrid = currentGrid
                        
                                    //actualCarryWeight = actualCarryWeight + itemOnGround.content.weight*itemOnGround.content.ammount
                                        
                                    //console.log(actualCarryWeight)
                                    //showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight
                                    itemOnGround.content.ammountText=' x '+itemOnGround.content.ammount
                                    itemOnGround.content.wholeName = itemOnGround.content.name + itemOnGround.content.ammountText
                                    itemOnGround.content.infoCellWeight = 'Weight : '+(itemOnGround.content.weight*itemOnGround.content.ammount)
                                    items.push(itemOnGround.content)
                                    //showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight
                                    console.log('tworzymy nowe po stacku')
                                    console.log(itemOnGround.content.ammount)
                                    break
    
                                    }
                                } 

                                if (i+1==items.length){
                                    dimensionX = itemOnGround.content.dimensions.x
                                    dimensionY = itemOnGround.content.dimensions.y
                                    checkGridAvailability(dimensionX,dimensionY)
                                    if(spaceAvailabile){
                                    lameCalculations()
                                    itemOnGround.content.position.x = newItemPositionX
                                    itemOnGround.content.position.y = newItemPositionY
                                    itemOnGround.content.created = false
                                    itemOnGround.content.active = true
                                    itemOnGround.content.beginningBlockArray = beginningBlockArray
                                    itemOnGround.content.addingToItemOnGridArray()
                                    //this.content.itemOnGrid = currentGrid
                        
                                    actualCarryWeight = actualCarryWeight + itemOnGround.content.weight*itemOnGround.content.ammount
                 
                                    //console.log(typeof(actualCarryWeight))
                                    showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight
                                    
                                    items.push(itemOnGround.content)
                                    console.log('tworzymy nowe')
                                    break
                       
                                    }
                                }
                            }

                        
                    }
                    //podnoszenie itemu bez stackow z ziemi
                    else{
                        dimensionX = itemOnGround.content.dimensions.x
                        dimensionY = itemOnGround.content.dimensions.y
                        checkGridAvailability(dimensionX,dimensionY)
                        if(spaceAvailabile){
                        lameCalculations()
                        itemOnGround.content.position.x = newItemPositionX
                        itemOnGround.content.position.y = newItemPositionY
                        itemOnGround.content.created = false
                        itemOnGround.content.active = true
                        itemOnGround.content.beginningBlockArray = beginningBlockArray
                        itemOnGround.content.addingToItemOnGridArray()
                        //this.content.itemOnGrid = currentGrid
            
                        actualCarryWeight = actualCarryWeight + itemOnGround.content.weight*itemOnGround.content.ammount
     
                        console.log('error')
                        showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight.toFixed(2))+" / "+player.carryWeight
                        
                        items.push(itemOnGround.content)
            

                            
    
            
            }

                    }
                    itemIndex = itemsOnGround.indexOf(itemOnGround) // usuniecie itemu z ziemi
                    itemsOnGround.splice(itemIndex,1)
                    itemFoundOnGround = true

                }
                
            }
            if(itemFoundOnGround&&!keyECooldown){
                itemFoundOnGround = false
                keyE=false
                keyECooldown = true
                return
            }
        })

    
  }
}
