let playIntro = false;
let startHighlighted = false;
let loadHighlighted = false;
function intro(){
  if(playIntro){
    if(alpha < 1&&alphaOn){
      alpha += 0.01
    }   
    if(alpha > 0.01&&!alphaOn){
      alpha -= 0.01
    }   
    // if(keyE){
    //   alphaOn=false;
    //   turnOffIntro=true;
    //   stopAll=true;
    // }
    if(alpha <= 0.01&&turnOffIntro){
      playIntro = false;
      console.log("1")
    }  
    v.globalAlpha = alpha;
    c.globalAlpha = alpha;
    v.drawImage(introImage,1,1,1224,776)
    if(startHighlighted&&playIntro){
      v.drawImage(startSelector,278,327,250,80)
    }
    if(loadHighlighted&&playIntro){
      v.drawImage(startSelector,278,390,250,80)
    }

  }
}
function introChoiceMove(event){
  if(playIntro&&!turnOffIntro){
    if(event.clientX<558&&
      event.clientX>278&&
      event.clientY>347&&
      event.clientY<395){
          startHighlighted = true
      }
      else{
          startHighlighted = false
      }
      if(event.clientX<558&&
        event.clientX>278&&
        event.clientY>420&&
        event.clientY<460){
            loadHighlighted = true
        }
        else{
            loadHighlighted = false
        }
  }

}
function introChoiceClick(event){
  if(playIntro&&startHighlighted){
    alphaOn=false;
    turnOffIntro=true;
    stopAll=true;
  }
}