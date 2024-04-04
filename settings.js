let settingsOpen = false;
let optionsHighlighted = false;
let saveLoadHighlighted = false;
let resumeHighlighted = false;

function drawSettings(){
    if(settingsOpen){

        v.fillStyle = 'black'
        v.fillRect(380,200,500,70)
        v.fillRect(380,300,500,70)
        v.fillRect(380,400,500,70)
        if(optionsHighlighted){
            v.fillStyle = 'aqua'
        }
        else{
            v.fillStyle = 'lightSkyBlue'
        }
        v.fillRect(383,203,494,64)
        if(saveLoadHighlighted){
            v.fillStyle = 'aqua'
        }
        else{
            v.fillStyle = 'lightSkyBlue'
        }
        v.fillRect(383,303,494,64)
        if(resumeHighlighted){
            v.fillStyle = 'aqua'
        }
        else{
            v.fillStyle = 'lightSkyBlue'
        }
        v.fillRect(383,403,494,64)
        v.fillStyle = 'black'
        v.font = "48px serif";
        v.fillText('OPTIONS', 530, 250);
        v.fillStyle = 'black'
        v.font = "48px serif";
        v.fillText('SAVE/LOAD', 500, 350);
        v.fillStyle = 'black'
        v.font = "48px serif";
        v.fillText('RESUME', 530, 450);
    }

}

function highlightOptions(event){
    if(settingsOpen){
        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>200&&
            event.clientY<270){
                optionsHighlighted = true
            }
            else{
                optionsHighlighted = false
            }
        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>300&&
            event.clientY<370){
                saveLoadHighlighted = true
            }
            else{
                saveLoadHighlighted = false
            }
        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>400&&
            event.clientY<470){
                resumeHighlighted = true
            }
            else{
                resumeHighlighted = false
            }
    }
}

function clickOnOptions(event){
    if(settingsOpen){
        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>200&&
            event.clientY<270){
                console.log('options')
            }

        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>300&&
            event.clientY<370){
                console.log('save load')
            }

        if(event.clientX<880&&
            event.clientX>380&&
            event.clientY>400&&
            event.clientY<470){
                settingsOpen = false;
                stopAll = false;
                resumeHighlighted = false;
            }

    }
}