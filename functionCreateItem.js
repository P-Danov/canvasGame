
function createNewItem({itemId,rarity,ammount,tier}){
    if(itemId=='random'){
      console.log('type random')
    }
    if(rarity=='random'){
      console.log('rarity random')
    }
    
    dimensionX=itemId.dimensionX;
    dimensionY=itemId.dimensionY;
      checkGridAvailability(dimensionX,dimensionY)
      if(spaceAvailabile){
        lameCalculations()
        items.push(new Item({position:{x:newItemPositionX,y:newItemPositionY},dimensions:{x:itemId.dimensionX,y:itemId.dimensionY}},
          beginningBlockArray,
          {name:itemId.name,
            type:itemId.type,
            ammount:ammount,
            rarity:rarity,
            minDamage:itemId.minDamage,
            maxDamage:itemId.maxDamage,
            weight:itemId.weight,
            attackSpeed:itemId.attackSpeed,
            attackRange:itemId.attackRange,
            damageSource:itemId.damageSource,
            attackType:itemId.attackType,
            knockback:itemId.knockback,
            imageSRC:itemId.imageSRC,
        
            defence:itemId.defence,
            armorType:itemId.armorType}))
      }
}
function createNewItemOnGround({itemId,rarity,ammount,tier,position}){

  //if(ammount=='random'){
  //  ammount=1
  //}

  //console.log('trash')
  //currentItem.addingToItemOnGridArray()
  let itemCreatedNow = new Item({position:{x:0,y:0},dimensions:{x:itemId.dimensionX,y:itemId.dimensionY}},
    beginningBlockArray,
    {name:itemId.name,
      type:itemId.type,
      ammount:ammount,
      rarity:rarity,
      minDamage:itemId.minDamage,
      maxDamage:itemId.maxDamage,
      weight:itemId.weight,
      attackSpeed:itemId.attackSpeed,
      attackRange:itemId.attackRange,
      damageSource:itemId.damageSource,
      attackType:itemId.attackType,
      knockback:itemId.knockback,
      imageSRC:itemId.imageSRC,
  
      defence:itemId.defence,
      armorType:itemId.armorType})

  itemsOnGround.push(new ItemOnGround({content:itemCreatedNow,position:{x:position.x,y:position.y}}))
  movables = [...blocks,...grassArray,...enemies,startingAreaBackground,...trees,...itemsOnGround]

  itemCreatedNow = {}
  //rarity = 'random'
  //ammount = 'random'
  
  

  console.log(itemId,ammount)
  
}


//let tier1Items = [stick,dagger,shortSword]
//let tier2Items = [sword,short]

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