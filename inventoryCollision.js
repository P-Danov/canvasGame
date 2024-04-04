const equipedWeaponDamage = {
    min:0,
    max:0
  }
const equipedItems = []
function detectEquipmentCollision(){
    if(currentItemOn&&currentItem.type=='bodyArmor'){
        if(detectCollision4({object1:currentItem,object2:bodyArmorSlot})){
                equipment.bodyArmorCollision = true
                if(equipment.bodyArmorOn){
                    disabled = true
                }
                else{
                    disabled = false
                }

            }
            else {
                equipment.bodyArmorCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='helmet'){
        if(detectCollision4({object1:currentItem,object2:helmetArmorSlot})){
                equipment.helmetCollision = true
                if(equipment.helmetOn){
                    disabled = true
                    console.log('disabled')
                }
                else{
                    disabled = false
                }
         
            }
            else {
                equipment.helmetCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='gloves'){
        if(detectCollision4({object1:currentItem,object2:glovesArmorSlot})){
                equipment.glovesCollision = true
                if(equipment.glovesOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }

            }
            else {
                equipment.glovesCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='boots'){
        if(detectCollision4({object1:currentItem,object2:bootsArmorSlot})){
                equipment.bootsCollision = true
                if(equipment.bootsOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }
  
            }
            else {
                equipment.bootsCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='belt'){
        if(detectCollision4({object1:currentItem,object2:beltArmorSlot})){
                equipment.beltCollision = true
                if(equipment.beltOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }
  
            }
            else {
                equipment.beltCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.name=='Amulet'){
        if(detectCollision4({object1:currentItem,object2:amuletArmorSlot})){
                equipment.amuletCollision = true
                if(equipment.amuletOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }
            }
            else {
                equipment.amuletCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.name=='Ring'){
        if(detectCollision4({object1:currentItem,object2:ring1ArmorSlot})){
                equipment.ring1Collision = true
                if(equipment.ring1On){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }

            }
            else {
                equipment.ring1Collision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.name=='Ring'){
        if(detectCollision4({object1:currentItem,object2:ring2ArmorSlot})){
                equipment.ring2Collision = true
                if(equipment.ring2On){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }

            }
            else {
                equipment.ring2Collision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='shield'){
        if(detectCollision4({object1:currentItem,object2:weaponRightSlot})){
                equipment.weaponRightCollision = true
                if(equipment.weaponRightOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }
 
            }
            else {
                equipment.weaponRightCollision = false
                disabled = false
            }
    }
    if(currentItemOn&&currentItem.type=='weapon'){
        if(detectCollision4({object1:currentItem,object2:weaponLeftSlot})){
                equipment.weaponLeftCollision = true
                if(equipment.weaponLeftOn){
                    disabled = true
                 
                }
                else{
                    disabled = false
                }

            }
            else {
                equipment.weaponLeftCollision = false
                disabled = false
            }
    }
}



function changeEquipment(event){
    if(currentItemOn&&currentItem.type=='bodyArmor'&&!equipment.bodyArmorOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:bodyArmorSlot})){
                
                equipment.bodyArmorOn = true
                equipment.bodyArmor = currentItem
                equipedItems.push(equipment.bodyArmor)   
                currentItem.position.x = bodyArmorSlot.position.x
                currentItem.position.y = bodyArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()


            }
    }
    else if(currentItemOn&&currentItem.type=='bodyArmor'&&equipment.bodyArmorOn&&!disabled){
        if(event.clientX<bodyArmorSlot.position.x+bodyArmorSlot.width&&
            event.clientX>bodyArmorSlot.position.x&&
            event.clientY>bodyArmorSlot.position.y&&
            event.clientY<bodyArmorSlot.position.y+bodyArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.bodyArmor) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.bodyArmorOn = false
                equipment.bodyArmor = {}  
                currentItem.equiped = false 
                updateArmorStats()  
               
            }
    }
    if(currentItemOn&&currentItem.type=='helmet'&&!equipment.helmetOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:helmetArmorSlot})){
                
                equipment.helmetOn = true
                equipment.helmet = currentItem   
                equipedItems.push(equipment.helmet)   
                currentItem.position.x = helmetArmorSlot.position.x
                currentItem.position.y = helmetArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()
      
            }
    }
    else if(currentItemOn&&currentItem.type=='helmet'&&equipment.helmetOn&&!disabled){
        if(event.clientX<helmetArmorSlot.position.x+helmetArmorSlot.width&&
            event.clientX>helmetArmorSlot.position.x&&
            event.clientY>helmetArmorSlot.position.y&&
            event.clientY<helmetArmorSlot.position.y+helmetArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.helmet) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.helmetOn = false
                equipment.helmet = {}  
                currentItem.equiped = false   
                updateArmorStats()  

                
            }
    }
    if(currentItemOn&&currentItem.type=='boots'&&!equipment.bootsOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:bootsArmorSlot})){
                
                equipment.bootsOn = true
                equipment.boots = currentItem
                equipedItems.push(equipment.boots)      
                currentItem.position.x = bootsArmorSlot.position.x
                currentItem.position.y = bootsArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()
         
            }
    }
    else if(currentItemOn&&currentItem.type=='boots'&&equipment.bootsOn&&!disabled){
        if(event.clientX<bootsArmorSlot.position.x+bootsArmorSlot.width&&
            event.clientX>bootsArmorSlot.position.x&&
            event.clientY>bootsArmorSlot.position.y&&
            event.clientY<bootsArmorSlot.position.y+bootsArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.boots) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.bootsOn = false
                equipment.boots = {}  
                currentItem.equiped = false     
                updateArmorStats()
                
            }
    }
    if(currentItemOn&&currentItem.type=='gloves'&&!equipment.glovesOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:glovesArmorSlot})){
                
                equipment.glovesOn = true
                equipment.gloves = currentItem  
                equipedItems.push(equipment.gloves)    
                currentItem.position.x = glovesArmorSlot.position.x
                currentItem.position.y = glovesArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()       
            }
    }
    else if(currentItemOn&&currentItem.type=='gloves'&&equipment.glovesOn&&!disabled){
        if(event.clientX<glovesArmorSlot.position.x+glovesArmorSlot.width&&
            event.clientX>glovesArmorSlot.position.x&&
            event.clientY>glovesArmorSlot.position.y&&
            event.clientY<glovesArmorSlot.position.y+glovesArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.gloves) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.glovesOn = false
                equipment.gloves = {}  
                currentItem.equiped = false     
                updateArmorStats()
                
            }
    }
    if(currentItemOn&&currentItem.type=='belt'&&!equipment.beltOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:beltArmorSlot})){
                
                equipment.beltOn = true
                equipment.belt = currentItem  
                equipedItems.push(equipment.belt)    
                currentItem.position.x = beltArmorSlot.position.x
                currentItem.position.y = beltArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()      
            }
    }
    else if(currentItemOn&&currentItem.type=='belt'&&equipment.beltOn&&!disabled){
        if(event.clientX<beltArmorSlot.position.x+beltArmorSlot.width&&
            event.clientX>beltArmorSlot.position.x&&
            event.clientY>beltArmorSlot.position.y&&
            event.clientY<beltArmorSlot.position.y+beltArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.belt) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.beltOn = false
                equipment.belt = {}  
                currentItem.equiped = false     
                updateArmorStats()
                
            }
    }
    if(currentItemOn&&currentItem.name=='Amulet'&&!equipment.amuletOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:amuletArmorSlot})){
                
                equipment.amuletOn = true
                equipment.amulet = currentItem  
                equipedItems.push(equipment.amulet)    
                currentItem.position.x = amuletArmorSlot.position.x
                currentItem.position.y = amuletArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()      
            }
    }
    else if(currentItemOn&&currentItem.name=='Amulet'&&equipment.amuletOn&&!disabled){
        if(event.clientX<amuletArmorSlot.position.x+amuletArmorSlot.width&&
            event.clientX>amuletArmorSlot.position.x&&
            event.clientY>amuletArmorSlot.position.y&&
            event.clientY<amuletArmorSlot.position.y+amuletArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.amulet) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.amuletOn = false
                equipment.amulet = {}  
                currentItem.equiped = false     
                updateArmorStats()
                
            }
    }
    if(currentItemOn&&currentItem.name=='Ring'&&!equipment.ring1On&&!disabled){
        if(detectCollision4({object1:currentItem,object2:ring1ArmorSlot})){
                
                equipment.ring1On = true
                equipment.ring1 = currentItem  
                equipedItems.push(equipment.ring1)    
                currentItem.position.x = ring1ArmorSlot.position.x
                currentItem.position.y = ring1ArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()        
            }
    }
    else if(currentItemOn&&currentItem.name=='Ring'&&equipment.ring1On&&!disabled){
        if(event.clientX<ring1ArmorSlot.position.x+ring1ArmorSlot.width&&
            event.clientX>ring1ArmorSlot.position.x&&
            event.clientY>ring1ArmorSlot.position.y&&
            event.clientY<ring1ArmorSlot.position.y+ring1ArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.ring1) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.ring1On = false
                equipment.ring1 = {}  
                currentItem.equiped = false     
                updateArmorStats()
            }
    }
    if(currentItemOn&&currentItem.name=='Ring'&&!equipment.ring2On&&!disabled){
        if(detectCollision4({object1:currentItem,object2:ring2ArmorSlot})){
                
                equipment.ring2On = true
                equipment.ring2 = currentItem   
                equipedItems.push(equipment.ring2)   
                currentItem.position.x = ring2ArmorSlot.position.x
                currentItem.position.y = ring2ArmorSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()       
            }
    }
    else if(currentItemOn&&currentItem.name=='Ring'&&equipment.ring2On&&!disabled){
        if(event.clientX<ring2ArmorSlot.position.x+ring2ArmorSlot.width&&
            event.clientX>ring2ArmorSlot.position.x&&
            event.clientY>ring2ArmorSlot.position.y&&
            event.clientY<ring2ArmorSlot.position.y+ring2ArmorSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.ring2) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.ring2On = false
                equipment.ring2 = {}  
                currentItem.equiped = false     
                updateArmorStats()
                
            }
    }
    if(currentItemOn&&currentItem.type=='weapon'&&!equipment.weaponLeftOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:weaponLeftSlot})){
                
                equipment.weaponLeftOn = true
                equipment.weaponLeft = currentItem 
                equipedItems.push(equipment.weaponLeft)    

                //equipedWeaponDamage.min += equipment.weaponLeft.minDamage
                //equipedWeaponDamage.max += equipment.weaponLeft.maxDamage
                player.attackRange = equipment.weaponLeft.attackRange
                player.attackSpeed = player.attackSpeed/equipment.weaponLeft.attackSpeed
                player.knockback = equipment.weaponLeft.knockback*player.strength
                //player.minDamage = 0 + equipedWeaponDamage.min*(player.strength*0.2)
                //player.maxDamage = 1 + equipedWeaponDamage.max*(player.strength*0.2)
                //showInventoryStat.damage=player.minDamage+" - "+player.maxDamage
                weaponsInField.src = equipment.weaponLeft.imageSRC

                if(currentItem.dimensions.x==1){
                    currentItem.position.x = weaponLeftSlot.position.x+54/2
                }
                if(currentItem.dimensions.x==2){
                    currentItem.position.x = weaponLeftSlot.position.x
                }
                if(currentItem.dimensions.y==2){
                    currentItem.position.y = weaponLeftSlot.position.y+46/2
                }
                if(currentItem.dimensions.y==3){
                    currentItem.position.y = weaponLeftSlot.position.y
                }
                
                
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()       
            }
    }
    else if(currentItemOn&&currentItem.type=='weapon'&&equipment.weaponLeftOn&&!disabled){
        if(event.clientX<weaponLeftSlot.position.x+weaponLeftSlot.width&&
            event.clientX>weaponLeftSlot.position.x&&
            event.clientY>weaponLeftSlot.position.y&&
            event.clientY<weaponLeftSlot.position.y+weaponLeftSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.weaponLeft) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                //equipedWeaponDamage.min -= equipment.weaponLeft.minDamage
                //equipedWeaponDamage.max -= equipment.weaponLeft.maxDamage
                player.attackRange = 0.4
                player.attackSpeed = 500
                player.knockback = 10*player.strength
                //player.minDamage = 0 + equipedWeaponDamage.min*(player.strength*0.2)
                //player.maxDamage = 1 + equipedWeaponDamage.max*(player.strength*0.2)
                //showInventoryStat.damage=player.minDamage+" - "+player.maxDamage
                weaponsInField.src = 'images/attack/punch.png'
                

                equipment.weaponLeftOn = false
                equipment.weaponLeft = {}  
                currentItem.equiped = false     
                updateArmorStats()
            }
    }
    if(currentItemOn&&currentItem.type=='shield'&&!equipment.weaponRightOn&&!disabled){
        if(detectCollision4({object1:currentItem,object2:weaponRightSlot})){
                
                equipment.weaponRightOn = true
                equipment.weaponRight = currentItem  
                equipedItems.push(equipment.weaponRight)    
                currentItem.position.x = weaponRightSlot.position.x
                currentItem.position.y = weaponRightSlot.position.y
                currentItemOn = false
                currentItem.equiped = true
                currentItem.pickedUp = false
                currentItem.currentItemDraw = false
                currentItem.itemOnGrid = []
                updateArmorStats()       
            }
    }
    else if(currentItemOn&&currentItem.type=='shield'&&equipment.weaponRightOn&&!disabled){
        if(event.clientX<weaponRightSlot.position.x+weaponRightSlot.width&&
            event.clientX>weaponRightSlot.position.x&&
            event.clientY>weaponRightSlot.position.y&&
            event.clientY<weaponRightSlot.position.y+weaponRightSlot.height){
                
                itemIndex = equipedItems.indexOf(equipment.weaponRight) // usuniecie itemu z ziemi
                equipedItems.splice(itemIndex,1)
                equipment.weaponRightOn = false
                equipment.weaponRight = {}  
                currentItem.equiped = false     
                updateArmorStats()
            }
    }
}

function updateArmorStats(){
    player.physicalDefence = Math.round(player.endurance*0.1)
    equipedWeaponDamage.min = 0
    equipedWeaponDamage.max = 0
    updateMinDamage = 0 + player.strength * 0.2
    updateMaxDamage = 1 + player.strength * 0.2
    player.minDamage = Math.round(updateMinDamage + equipedWeaponDamage.min * (player.strength * 0.1));
    player.maxDamage = Math.round(updateMaxDamage + equipedWeaponDamage.max * (player.strength * 0.1));
    
    equipedItems.forEach((equipedItem)=>{
        if(equipedItem.defence>0){
            player.physicalDefence = player.physicalDefence + equipedItem.defence
        }
        if(equipedItem.minDamage>0){
            equipedWeaponDamage.min = equipedWeaponDamage.min + equipedItem.minDamage
            equipedWeaponDamage.max = equipedWeaponDamage.max + equipedItem.maxDamage
        }



    })
    player.carryWeight = 45 + player.strength*5
    showInventoryCarryWeight = "Carry Weight : "+(actualCarryWeight)+" / "+player.carryWeight
    showInventoryStat.physicalDefence=player.physicalDefence+" %"
    //showInventoryStat.physicalDefence = Math.round(player.endurance*0.1)+" %"
    player.minDamage = Math.round(updateMinDamage + equipedWeaponDamage.min + (equipedWeaponDamage.min * (player.strength * 0.1)/2));
    player.maxDamage = Math.round(updateMaxDamage + equipedWeaponDamage.max + (equipedWeaponDamage.max * (player.strength * 0.1)/2));
    showInventoryStat.damage=player.minDamage+" - "+player.maxDamage
    showInventoryStat.buyPrice = 150 - (player.charisma*0.4) +"%";
    showInventoryStat.sellPrice = 50 + (player.charisma*0.4) +"%";
    showInventoryStat.attackSpeed = 500
    showInventoryStat.evasion = Math.round(player.agility*0.1) +"%"
    player.knockback = 10*player.strength

    //player.minDamage = Math.round(0 + equipedWeaponDamage.min + (player.strength * 0.2));
    //player.maxDamage = Math.round(1 + equipedWeaponDamage.max + (player.strength * 0.6))          
    //player.damage = Math.floor(Math.random() * (player.maxDamage - player.minDamage + 1) + player.minDamage)
}