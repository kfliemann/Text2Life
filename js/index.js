//create the alphabet buttons to decide which charakter should turn into life
function addButtons(){
    var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for(i=0; i<letters.length;i++){
        var button = document.createElement("input");         
        button.setAttribute("id", letters[i]);
        button.setAttribute("type", "submit");
        button.setAttribute("value", letters[i]);
        button.onclick = function() {storeButtonChosen(this.value)};
        
        var form = document.getElementById("buttonForm");
        form.appendChild(button);
    }
    
}

//store information between pages
function storeButtonChosen(input){
    var textfield = document.getElementById("textfield").value; 
    sessionStorage.setItem("buttonChosen", input);
    sessionStorage.setItem("text", textfield);
}

//maingame loop
function mainGame(){
    var fulltext = sessionStorage.getItem("text");
    var width = screen.width;
    var height = screen.height;
    
    switch (width) {
        case 2560:
            var num1 = 59;
            var num2 = 208;
            var finalArray = arrProducer(fulltext,num1,num2);
            initializeSite(finalArray);
        break;

        case 1920:
            //TODO
        break;

        default:
        alert("Unexpected Screensize");
    }
}

//the first representation of the text in life form
function initializeSite(arr){
    var element = document.getElementById("main");
    var finalString = "";
    
    for(i=0; i<arr.length; i++){
        for(j=0; j<arr[i].length;j++){
            if(arr[i][j] == 1){
                finalString += '\u2588'; 
            }else{
                finalString += '\u2591';
            }
    }
    var tag = document.createElement("p");
    var text = document.createTextNode(finalString);
    tag.appendChild(text);
    element.appendChild(tag);
    finalString = "";
    }
}


//turn the text to an array of arrays, where information is stored
function arrProducer(text, height,width){
    var num2 = height;
    var num1 = width;
    var num3 = num1 * num2;
    var arrToFill = twoDimArray(height,width);
    if(text.length>num3){
            alert("Text too big for application, try to shorten it");
            //TODO
    }else{
        var countWidth = 0;
        var countHeight = 0;

        for(i = 0; i<text.length; i++){
            var character = text.substring(i, i+1);
            if(character.toLowerCase() === sessionStorage.getItem("buttonChosen").toLowerCase()){
                if(countWidth < width){
                    arrToFill[countHeight][countWidth] = 1;
                    countWidth += 1;
                }else{
                    countHeight += 1;
                    countWidth = 0;
                    arrToFill[countHeight][countWidth] = 1;
                    countWidth += 1;
                }
            }else{
                if(countWidth < width){
                    arrToFill[countHeight][countWidth] = 0;
                    countWidth += 1;
                }else{
                    countHeight += 1;
                    countWidth = 0;
                    arrToFill[countHeight][countWidth] = 0;
                    countWidth += 1;
                }
            }

        }

        //if the text.length is shorter than the whole array of arrays space fill the rest of array with blank 
        if(arrToFill[countHeight].length != countWidth){
            for(i = countWidth; i<arrToFill[countHeight].length; i++){
                arrToFill[countHeight][i] = 0;
            }
            for(j = countHeight+1; j<arrToFill.length; j++){
                for(k = 0; k < width; k++){
                    arrToFill[j][k] = 0;
                }
            }
        }else{
            for(j = countHeight+1; j<arrToFill.length; j++){
                for(k = 0; k < width; k++){
                    arrToFill[j][k] = 0;
                }
            }
        }
    }
    return arrToFill;
}

//for testing purposes
function variableThroughSites(){
    var buttonChosen = sessionStorage.getItem("text");
    var tag = document.createElement("p");
    var text = document.createTextNode(buttonChosen);
    tag.appendChild(text);
    var element = document.getElementById("main");
    element.appendChild(tag);
}
//create an array of arrays

// [0] [0,1,2,3,4 .. width]
// [1] [0,1,2,3,4 .. width]
// [height ] [0,1,2,3,4 .. width]
function twoDimArray(height,width){
    //columns
    var x = new Array(height);
    //rows
    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(width);
    }
    return x;
}
