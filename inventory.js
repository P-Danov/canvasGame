const inventoryGridArray = [0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,                     
                            0,0,0,0,0,0,0,0,0,0,                    
                            0,0,0,0,0,0,0,0,0,0,                    
                            0,0,0,0,0,0,0,0,0,0,                    
                            0,0,0,0,0,0,0,0,0,0,                    
                            0,0,0,0,0,0,0,0,0,0,                   
                           ]
let showStats = 3;
let skillPointButton = 0;
let updateMinDamage;
let updateMaxDamage;
let equipedItem = {minDamage:0}
class InventoryGrid{
    constructor({position,index}){
        this.position = position
        this.index = index
        this.width = 54
        this.height = 45
        this.freeSlot = true
        this.freeSlotColor = true
        this.collisionObject = {
            x:this.position.x + this.width/2,
            y:this.position.y + this.height/2,
            width:3,
            height:2
        }
    }
    draw(){
        if(!this.freeSlot&&currentItemOn){
            if(!this.freeSlot){
                c.fillStyle = 'red'
                c.fillRect(this.position.x,this.position.y,this.width,this.height)
            }
        }
        else if(!this.freeSlotColor&&currentItemOn){
            if(this.freeSlot){
                c.fillStyle = 'green'
                c.fillRect(this.position.x,this.position.y,this.width,this.height)
            }
        }
        this.checkCollisionHeldItem()
    }
    checkCollisionHeldItem(){
        if(currentItemOn){
                    if(detectCollision({
                        object1:this.collisionObject,
                        object2:currentItem
                    })){
                        this.freeSlotColor = false
                    }
                    else{
                        this.freeSlotColor = true

                    }
        }
    }

}

const equipment = {
    bodyArmor : {},
    bodyArmorCollision : false,
    bodyArmorOn : false,

    helmet : {},
    helmetCollision : false,
    helmetOn : false,

    gloves : {},
    glovesCollision : false,
    glovesOn : false,

    boots : {},
    bootsCollision : false,
    bootsOn : false,

    belt : {},
    beltCollision : false,
    beltOn : false,

    ring1 : {},
    ring1Collision : false,
    ring1On : false,

    ring2 : {},
    ring2Collision : false,
    ring2On : false,

    amulet : {},
    amuletCollision : false,
    amuletOn : false,

    weaponLeft : {},
    weaponLeftCollision : false,
    weaponLeftOn : false,

    weaponRight : {},
    weaponRightCollision : false,
    weaponRightOn : false,
}


const bodyArmorSlot = {
    position:{
        x:208,
        y:210+62,
    },
        width:57*2,
        height:49*3
}
const helmetArmorSlot = {
    position:{
        x:208,
        y:64+62,
    },
        width:57*2,
        height:49*2
}
const bootsArmorSlot = {
    position:{
        x:381,
        y:470,
    },
        width:57*2,
        height:49*2
}
const beltArmorSlot = {
    position:{
        x:208,
        y:402+62,
    },
        width:57*2,
        height:49*1
}
const glovesArmorSlot = {
    position:{
        x:37,
        y:470,
    },
        width:57*2,
        height:49*2
}
const ring1ArmorSlot = {
    position:{
        x:98,
        y:388,
    },
        width:57*1,
        height:49*1
}
const ring2ArmorSlot = {
    position:{
        x:376,
        y:388,
    },
        width:57*1,
        height:49*1
}
const amuletArmorSlot = {
    position:{
        x:370,
        y:100,
    },
        width:57*1,
        height:49*1
}
const weaponLeftSlot = {
    position:{
        x:37,
        y:196,
    },
        width:57*2,
        height:49*3
}
const weaponRightSlot = {
    position:{
        x:379,
        y:196,
    },
        width:57*2,
        height:49*3
}
function inventoryStatDraw(){
    items.forEach((item)=>{
       actualCarryWeight = actualCarryWeight + item.weight*item.ammount

    })
    showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight)+" / "+player.carryWeight
}



function plusSkillPointButtonPush(){
    if(player.skillPoints>0){
        if(skillPointButton==1){
            player.skillPoints --;
            player.strength ++;
            //inventoryAttributesUpdate()
            updateArmorStats()
            showInventoryStat.skillPoints = player.skillPoints
            showInventoryStat.strength = player.strength
            showInventoryStat.damage = player.minDamage+" - "+player.maxDamage
            console.log(equipedWeaponDamage.min,equipedWeaponDamage.max)
        }
    

        else if(skillPointButton==2){
            player.skillPoints --;
            player.endurance ++;

            updateArmorStats()
            showInventoryStat.skillPoints = player.skillPoints
            showInventoryStat.endurance = player.endurance
            showInventoryStat.maxHp = 28 + player.endurance*2


        }

        else if(skillPointButton==3){
            player.skillPoints --;
            player.intelligence ++;
            updateArmorStats()
            showInventoryStat.skillPoints = player.skillPoints
            showInventoryStat.intelligence = player.intelligence
            showInventoryStat.maxMp = 8 + player.intelligence*2
            showInventoryStat.magicalDefence = Math.round(player.intelligence*0.1)+" %"

        }

        else if(skillPointButton==4){
            player.skillPoints --;
            player.agility ++;
            updateArmorStats()
            showInventoryStat.skillPoints = player.skillPoints
            showInventoryStat.agility = player.agility


        }

        else if(skillPointButton==5){
            player.skillPoints --;
            player.charisma ++;
            updateArmorStats()
            showInventoryStat.skillPoints = player.skillPoints
            showInventoryStat.charisma = player.charisma


        }
    }
}

function plusSkillPointButtonInterraction(event){
    if(event.clientX<240&&
        event.clientX>220&&
        event.clientY>615&&
        event.clientY<635&&inventoryOpen&&!lockInventory&&!currentItemOn){
            skillPointButton = 1;
        }
    else if(event.clientX<240&&
        event.clientX>220&&
        event.clientY>645&&
        event.clientY<665&&inventoryOpen&&!lockInventory&&!currentItemOn){
            skillPointButton = 2;
        }
    else if(event.clientX<240&&
        event.clientX>220&&
        event.clientY>675&&
        event.clientY<695&&inventoryOpen&&!lockInventory&&!currentItemOn){
            skillPointButton = 3;
        }
    else if(event.clientX<240&&
        event.clientX>220&&
        event.clientY>705&&
        event.clientY<725&&inventoryOpen&&!lockInventory&&!currentItemOn){
            skillPointButton = 4;
        }
    else if(event.clientX<240&&
        event.clientX>220&&
        event.clientY>735&&
        event.clientY<755&&inventoryOpen&&!lockInventory&&!currentItemOn){
            skillPointButton = 5;
        }
    else{
            skillPointButton = 0;
    }
}

function showPlusSkillPointButton(){
    if(player.skillPoints>0){
        c.fillStyle = 'black'
        c.fillRect(210,605,20,20)
        if(skillPointButton==1){
            c.fillStyle = 'aqua'
        }
        else{
            c.fillStyle = 'white'
        }

        c.fillRect(212,607,16,16)
        c.fillStyle = 'black'
        c.font = "bold 20pt serif"; 
        c.fillText("+",212+1,624,14,14)

        c.fillStyle = 'black'
        c.fillRect(210,635,20,20)
        if(skillPointButton==2){
            c.fillStyle = 'aqua'
        }
        else{
            c.fillStyle = 'white'
        }
        c.fillRect(212,637,16,16)
        c.fillStyle = 'black'
        c.font = "bold 20pt serif"; 
        c.fillText("+",212+1,654,14,14)

        c.fillStyle = 'black'
        c.fillRect(210,665,20,20)
        if(skillPointButton==3){
            c.fillStyle = 'aqua'
        }
        else{
            c.fillStyle = 'white'
        }
        c.fillRect(212,667,16,16)
        c.fillStyle = 'black'
        c.font = "bold 20pt serif"; 
        c.fillText("+",212+1,684,14,14)

        c.fillStyle = 'black'
        c.fillRect(210,695,20,20)
        if(skillPointButton==4){
            c.fillStyle = 'aqua'
        }
        else{
            c.fillStyle = 'white'
        }
        c.fillRect(212,697,16,16)
        c.fillStyle = 'black'
        c.font = "bold 20pt serif"; 
        c.fillText("+",212+1,714,14,14)

        c.fillStyle = 'black'
        c.fillRect(210,725,20,20)
        if(skillPointButton==5){
            c.fillStyle = 'aqua'
        }
        else{
            c.fillStyle = 'white'
        }
        c.fillRect(212,727,16,16)
        c.fillStyle = 'black'
        c.font = "bold 20pt serif"; 
        c.fillText("+",212+1,744,14,14)
    }
}

function inventoryAttributesInterraction(event){
    if(event.clientX<250&&
        event.clientX>20&&
        event.clientY>610&&
        event.clientY<640&&inventoryOpen&&!lockInventory&&!currentItemOn){
            showStats = 1;
        }
    else if(event.clientX<250&&
        event.clientX>20&&
        event.clientY>639&&
        event.clientY<670&&inventoryOpen&&!lockInventory&&!currentItemOn){
            showStats = 2;
        }
    else if(event.clientX<250&&
        event.clientX>20&&
        event.clientY>669&&
        event.clientY<700&&inventoryOpen&&!lockInventory&&!currentItemOn){
            showStats = 3;
        }
    else if(event.clientX<250&&
        event.clientX>20&&
        event.clientY>699&&
        event.clientY<730&&inventoryOpen&&!lockInventory&&!currentItemOn){
            showStats = 4;
        }
    else if(event.clientX<250&&
        event.clientX>20&&
        event.clientY>729&&
        event.clientY<760&&inventoryOpen&&!lockInventory&&!currentItemOn){
            showStats = 5;
        }
    else{
            showStats = 0;
        }
}
function inventoryAttributesDraw(){
    //c.fillStyle = 'black'
    //c.fillRect(238,600,320,150)
    if(showStats==1||showStats==2||showStats==3||showStats==4||showStats==5){
        c.fillRect(238,600,320,150)
        c.fillStyle = 'lightgrey'
    }
    else{
        c.fillStyle = 'grey'
    }

    c.fillRect(240,602,316,146)

    //c.fillStyle = 'black'
    //c.fillRect(20,600,220,30)
    if(showStats==1){
        c.fillStyle = 'black'
        c.fillRect(20,600,220,30)
        c.fillStyle = 'lightgrey'
        c.fillRect(22,602,218,26)
    }
    else{
        c.fillStyle = 'gray'
        c.fillRect(22,602,216,28)
    }


    //c.fillStyle = 'black'
    //c.fillRect(20,630,220,30)
    if(showStats==2){
        c.fillStyle = 'black'
        c.fillRect(20,630,220,30)
        c.fillStyle = 'lightgrey'
        c.fillRect(22,632,218,26)
    }
    else{
        c.fillStyle = 'gray'
        c.fillRect(22,632,216,28)
    }

    //c.fillStyle = 'black'
    //c.fillRect(20,660,220,30)
    if(showStats==3){
        c.fillStyle = 'black'
        c.fillRect(20,660,220,30)
        c.fillStyle = 'lightgrey'
        c.fillRect(22,662,218,26)
    }
    else{
        c.fillStyle = 'gray'
        c.fillRect(22,662,216,28)
    }
    
    //c.fillStyle = 'black'
    //c.fillRect(20,690,220,30)
    if(showStats==4){
        c.fillStyle = 'black'
        c.fillRect(20,690,220,30)
        c.fillStyle = 'lightgrey'
        c.fillRect(22,692,218,26)
    }
    else{
        c.fillStyle = 'gray'
        c.fillRect(22,692,216,28)
    }
    
    //c.fillStyle = 'black'
    //c.fillRect(20,720,220,30)
    if(showStats==5){
        c.fillStyle = 'black'
        c.fillRect(20,720,220,30)
        c.fillStyle = 'lightgrey'
        c.fillRect(22,722,218,26)
    }
    else{
        c.fillStyle = 'gray'
        c.fillRect(22,722,216,26)
    }
    

    c.fillStyle = 'black'
    c.font = "bold 20px serif";
    
    c.fillText(showInventoryStatText.skillPionts,190,570,150,100)
    c.fillText(showInventoryStat.skillPoints,320,570,150,100)

    c.fillText(showInventoryStatText.strength,30,620,150,100)
    c.fillText(showInventoryStatText.endurance,30,650,150,100)
    c.fillText(showInventoryStatText.intelligence,30,680,150,100)
    c.fillText(showInventoryStatText.agility ,30,710,150,100)
    c.fillText(showInventoryStatText.charisma,30,740,150,100)

    c.fillText(showInventoryStat.strength,180,620,150,100)
    c.fillText(showInventoryStat.endurance,180,650,150,100)
    c.fillText(showInventoryStat.intelligence,181,680,150,100)
    c.fillText(showInventoryStat.agility ,180,710,150,100)
    c.fillText(showInventoryStat.charisma,180,740,150,100)

    if(showStats==0){
        c.fillText(showInventoryStatText.damage,250,620,150,100)
        c.fillText(showInventoryStatText.maxHp,250,650,150,100)
        c.fillText(showInventoryStatText.physicalDefence,250,680,150,100)
        c.fillText(showInventoryStatText.maxMp ,250,710,150,100)
        c.fillText(showInventoryStatText.magicalDefence,250,740,150,100)
    
        c.fillText(showInventoryStat.damage,450,620,150,100)
        c.fillText(showInventoryStat.maxHp,450,650,150,100)
        c.fillText(showInventoryStat.physicalDefence,450,680,150,100)
        c.fillText(showInventoryStat.maxMp ,450,710,150,100)
        c.fillText(showInventoryStat.magicalDefence,450,740,150,100)
    }
    else if(showStats==1){
        c.fillText(showInventoryStatText.damage,250,620,150,100)
        c.fillText(showInventoryStatText.maxCarryWeight,250,650,150,100)

        c.fillText(showInventoryStat.damage,450,620,150,100)
        c.fillText(45+player.strength*5,450,650,150,100)
    }
    else if(showStats==2){
        c.fillText(showInventoryStatText.maxHp,250,620,150,100)
        c.fillText(showInventoryStatText.physicalDefence,250,650,150,100)

        c.fillText(showInventoryStat.maxHp,450,620,150,100)
        c.fillText(showInventoryStat.physicalDefence,450,650,150,100)
    }
    else if(showStats==3){
        c.fillText(showInventoryStatText.maxMp ,250,620,150,100)
        c.fillText(showInventoryStatText.magicalDefence,250,650,150,100)

        c.fillText(showInventoryStat.maxMp ,450,620,150,100)
        c.fillText(showInventoryStat.magicalDefence,450,650,150,100)
    }
    else if(showStats==4){
        c.fillText(showInventoryStatText.attackSpeed ,250,620,150,100)
        c.fillText(showInventoryStatText.evasion,250,650,150,100)

        c.fillText(showInventoryStat.attackSpeed ,450,620,150,100)
        c.fillText(showInventoryStat.evasion,450,650,150,100)
    }
    else if(showStats==5){
        c.fillText(showInventoryStatText.buyPrice ,250,620,150,100)
        c.fillText(showInventoryStatText.sellPrice,250,650,150,100)

        c.fillText(showInventoryStat.buyPrice ,450,620,150,100)
        c.fillText(showInventoryStat.sellPrice,450,650,150,100)
    }
}
function drawAllSlots(){
    if(currentItemOn){
        if(equipment.bodyArmorCollision&&equipment.bodyArmorOn){
            c.fillStyle = 'red'
            c.fillRect(bodyArmorSlot.position.x,bodyArmorSlot.position.y,bodyArmorSlot.width,bodyArmorSlot.height)
        }
        else if(!equipment.bodyArmorOn&&currentItem.type=='bodyArmor'&&equipment.bodyArmorCollision){
            c.fillStyle = 'green'
            c.fillRect(bodyArmorSlot.position.x,bodyArmorSlot.position.y,bodyArmorSlot.width,bodyArmorSlot.height)
        } 
        if(equipment.glovesCollision&&equipment.glovesOn){
            c.fillStyle = 'red'
            c.fillRect(glovesArmorSlot.position.x,glovesArmorSlot.position.y,glovesArmorSlot.width,glovesArmorSlot.height)
        }
        else if(!equipment.glovesOn&&currentItem.type=='gloves'&&equipment.glovesCollision){
            c.fillStyle = 'green'
            c.fillRect(glovesArmorSlot.position.x,glovesArmorSlot.position.y,glovesArmorSlot.width,glovesArmorSlot.height)
        }     
        if(equipment.bootsCollision&&equipment.bootsOn){
            c.fillStyle = 'red'
            c.fillRect(bootsArmorSlot.position.x,bootsArmorSlot.position.y,bootsArmorSlot.width,bootsArmorSlot.height)
        }
        else if(!equipment.bootsOn&&currentItem.type=='boots'&&equipment.bootsCollision){
            c.fillStyle = 'green'
            c.fillRect(bootsArmorSlot.position.x,bootsArmorSlot.position.y,bootsArmorSlot.width,bootsArmorSlot.height)
        } 
        if(equipment.helmetCollision&&equipment.helmetOn){
            c.fillStyle = 'red'
            c.fillRect(helmetArmorSlot.position.x,helmetArmorSlot.position.y,helmetArmorSlot.width,helmetArmorSlot.height)
        }
        else if(!equipment.helmetOn&&currentItem.type=='helmet'&&equipment.helmetCollision){
            c.fillStyle = 'green'
            c.fillRect(helmetArmorSlot.position.x,helmetArmorSlot.position.y,helmetArmorSlot.width,helmetArmorSlot.height)
        }  
        if(equipment.beltCollision&&equipment.beltOn){
            c.fillStyle = 'red'
            c.fillRect(beltArmorSlot.position.x,beltArmorSlot.position.y,beltArmorSlot.width,beltArmorSlot.height)
        }
        else if(!equipment.beltOn&&currentItem.type=='belt'&&equipment.beltCollision){
            c.fillStyle = 'green'
            c.fillRect(beltArmorSlot.position.x,beltArmorSlot.position.y,beltArmorSlot.width,beltArmorSlot.height)
        }  
        if(equipment.amuletCollision&&equipment.amuletOn){
            c.fillStyle = 'red'
            c.fillRect(amuletArmorSlot.position.x,amuletArmorSlot.position.y,amuletArmorSlot.width,amuletArmorSlot.height)
        }
        else if(!equipment.amuletOn&&currentItem.name=='Amulet'&&equipment.amuletCollision){
            c.fillStyle = 'green'
            c.fillRect(amuletArmorSlot.position.x,amuletArmorSlot.position.y,amuletArmorSlot.width,amuletArmorSlot.height)
        }   
        if(equipment.ring1Collision&&equipment.ring1On){
            c.fillStyle = 'red'
            c.fillRect(ring1ArmorSlot.position.x,ring1ArmorSlot.position.y,ring1ArmorSlot.width,ring1ArmorSlot.height)
        }
        else if(!equipment.ring1On&&currentItem.name=='Ring'&&equipment.ring1Collision){
            c.fillStyle = 'green'
            c.fillRect(ring1ArmorSlot.position.x,ring1ArmorSlot.position.y,ring1ArmorSlot.width,ring1ArmorSlot.height)
        }  
        if(equipment.ring2Collision&&equipment.ring2On){
            c.fillStyle = 'red'
            c.fillRect(ring2ArmorSlot.position.x,ring2ArmorSlot.position.y,ring2ArmorSlot.width,ring2ArmorSlot.height)
        }
        else if(!equipment.ring2On&&currentItem.name=='Ring'&&equipment.ring2Collision){
            c.fillStyle = 'green'
            c.fillRect(ring2ArmorSlot.position.x,ring2ArmorSlot.position.y,ring2ArmorSlot.width,ring2ArmorSlot.height)
        }  
        if(equipment.weaponLeftCollision&&equipment.weaponLeftOn){
            c.fillStyle = 'red'
            c.fillRect(weaponLeftSlot.position.x,weaponLeftSlot.position.y,weaponLeftSlot.width,weaponLeftSlot.height)
        }
        else if(!equipment.weaponLeftOn&&currentItem.type=='weapon'&&equipment.weaponLeftCollision){
            c.fillStyle = 'green'
            c.fillRect(weaponLeftSlot.position.x,weaponLeftSlot.position.y,weaponLeftSlot.width,weaponLeftSlot.height)
        }  
        if(equipment.weaponRightCollision&&equipment.weaponRightOn){
            c.fillStyle = 'red'
            c.fillRect(weaponRightSlot.position.x,weaponRightSlot.position.y,weaponRightSlot.width,weaponRightSlot.height)
        }
        else if(!equipment.weaponRightOn&&currentItem.type=='shield'&&equipment.weaponRightCollision){
            c.fillStyle = 'green'
            c.fillRect(weaponRightSlot.position.x,weaponRightSlot.position.y,weaponRightSlot.width,weaponRightSlot.height)
        }   

    }
    
}
function hoverOnSign(event){

            if(event.clientX<970+90&&
                event.clientX>980&&
                event.clientY>695&&
                event.clientY<695+80&&!inventoryOpen&&!settingsOpen){
                    invSignHoverVar = true
                }
                else{
                    invSignHoverVar = false
                }

            if(event.clientX<1090+90&&
                event.clientX>1100&&
                event.clientY>695&&
                event.clientY<695+80&&!inventoryOpen&&!settingsOpen){
                    statSignHoverVar = true
                }
                else{
                    statSignHoverVar = false
                }
    
            if(event.clientX<1070+100&&
                event.clientX>1070&&
                event.clientY>30&&
                event.clientY<30+100&&inventoryOpen){
                    xSignHoverVar = true 
                }
                else{
                    xSignHoverVar = false
            }


    

}
function clickOnSign(event){
    if(event.clientX<1070+100&&
        event.clientX>1100&&
        event.clientY>30&&
        event.clientY<30+100&&inventoryOpen&&!lockInventory&&!currentItemOn){
            inventoryOpen = false;
            stopAll = false;
            xSignHoverVar = false;
        }
    if(event.clientX<970+90&&
        event.clientX>980&&
        event.clientY>695&&
        event.clientY<695+80&&!inventoryOpen&&!settingsOpen){
            inventoryOpen = true;
            stopAll = true;
            invSignHoverVar = false;
    }
    if(event.clientX<1090+90&&
        event.clientX>1100&&
        event.clientY>695&&
        event.clientY<695+80&&!inventoryOpen&&!settingsOpen){
            resetDirectionsButtons();
            settingsOpen = true;
            stopAll = true;
            statSignHoverVar = false
        }

    //c.drawImage(invSignHover,970,695,90,80)
}

function openInventory(){
resetDirectionsButtons()

c.drawImage(inventory,0,0,1224,776)
c.drawImage(inventoryTrash,1070,620,100,100)
if(!xSignHoverVar){
    c.drawImage(xSign,1070,30,100,100)
}
else{
    c.drawImage(xSignHover,1070,30,100,100)
}
c.fillStyle = 'black'
c.font = "bold 20px serif";
c.fillText(showInventoryCarryWeight,800,600,150,100)

inventoryAttributesDraw()
showPlusSkillPointButton()
inventories.forEach((inventoryBlock)=>{
inventoryBlock.draw()

drawAllSlots()


})
items.forEach((item)=>{
    item.draw()
    //item.draw2()
    })
if (firstHover){
   // c.fillStyle = 'green'
   // c.fillRect(currentItemOnHover.position.x,currentItemOnHover.position.y,currentItemOnHover.width,currentItemOnHover.height)
}

}


