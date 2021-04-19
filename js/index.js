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
            //first instance of the cells
            initializeSite(finalArray);
            
            var timer = 500;
            
            //the next generations
            for(i = 0; i<100000; i++){
                setTimeout(function(){
                    finalArray = refreshPage(finalArray);
                }, timer);
                timer += 500;
            }
        break;

        case 1920:
            var num1 = 59;
            var num2 = 156;
            var finalArray = arrProducer(fulltext,num1,num2);
            //first instance of the cells
            initializeSite(finalArray);
            
            var timer = 500;
            
            //the next generations
            for(i = 0; i<100000; i++){
                setTimeout(function(){
                    finalArray = refreshPage(finalArray);
                }, timer);
                timer += 500;
            }
        break;

        default:
        alert("Unexpected Screensize");
    }
}

//representation of the text in life form
function initializeSite(arr){
    var element = document.getElementById("main");
    var finalString = "";
    
    //turn each living cell (1) and dead cell (0) into their respective unicode character
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
//selected charakter turns to 1, all other to 0
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

        //character conversion
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

        //if the text.length is shorter than the whole array of arrays space fill the rest of array with 0
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

//create a 2D array (array of arrays)
function twoDimArray(height,width){
    // [0] [0,1,2,3,4 .. width]
    // [1] [0,1,2,3,4 .. width]
    // [..] [0,1,2,3,4 .. width]
    // [height] [0,1,2,3,4 .. width]
    
    //columns
    var x = new Array(height);
    //rows
    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(width);
    }
    return x;
}

//calculate the new generation and refresh page 
function refreshPage(arr){
    var newGeneration = twoDimArray(arr.length, arr[0].length);
    var bottom = arr.length-1;
    var right = arr[0].length-1;

    //loop over all entities and check if the cell is alive or dead in next generation
    //all borders have to treated special, because wrap around is used
    for(i = 0; i<arr.length;i++){
        for(j=0; j<arr[i].length;j++){
            //top border
            if(i==0){
                //left border
                if(j==0){
                    var decider = 0;
                    //topleft
                    decider += arr[bottom][right];
                    //topmid
                    decider += arr[bottom][j];
                    //topright
                    decider += arr[bottom][j+1];

                    //midleft
                    decider += arr[i][right];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[i+1][right];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][j+1];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }//middle part
                else if(j>0 && j<arr[0].length){
                    var decider = 0;

                    //topleft
                    decider += arr[bottom][j-1];
                    //topmid
                    decider += arr[bottom][j];
                    //topright
                    decider += arr[bottom][j+1];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[i+1][j-1];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][j+1];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }//right border
                else if(j==arr[0].length-1){
                    var decider = 0;

                    //topleft
                    decider += arr[bottom][j-1];
                    //topmid
                    decider += arr[bottom][j];
                    //topright
                    decider += arr[bottom][0];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][0];

                    //botleft
                    decider += arr[i+1][j-1];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][0];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }
            }//middle part
            else if(i>0 && i<arr.length-1){
                //left border
                if(j==0){
                    var decider = 0;

                    //topleft
                    decider += arr[i-1][right];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][j+1];

                    //midleft
                    decider += arr[i][right];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[i+1][right];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][j+1];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                //special case top right    
                }//middle part
                else if(j>0 && j<arr[0].length){
                    var decider = 0;
                    
                    //topleft
                    decider += arr[i-1][j-1];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][j+1];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[i+1][j-1];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][j+1];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }//right border
                else if(j==arr[0].length-1){
                    var decider = 0;

                    //topleft
                    decider += arr[i-1][j-1];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][0];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][0];

                    //botleft
                    decider += arr[i+1][j-1];
                    //botmid
                    decider += arr[i+1][j];
                    //botright
                    decider += arr[i+1][0];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }

            }//bottom border
            else if(i==arr.length-1){
                //left border
                if(j==0){
                    var decider = 0;
                    
                    //topleft
                    decider += arr[i-1][right];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][j+1];

                    //midleft
                    decider += arr[i][right];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[0][right];
                    //botmid
                    decider += arr[0][j];
                    //botright
                    decider += arr[0][j+1];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                //special case top right    
                }//middle part
                else if(j>0 && j<arr[0].length){
                    var decider = 0;
                    
                    //topleft
                    decider += arr[i-1][j-1];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][j+1];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][j+1];

                    //botleft
                    decider += arr[0][j-1];
                    //botmid
                    decider += arr[0][j];
                    //botright
                    decider += arr[0][j+1];
                    
                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }//right border
                else if(j==arr[0].length-1){
                    var decider = 0;

                    //topleft
                    decider += arr[i-1][j-1];
                    //topmid
                    decider += arr[i-1][j];
                    //topright
                    decider += arr[i-1][0];

                    //midleft
                    decider += arr[i][j-1];
                    //midright
                    decider += arr[i][0];

                    //botleft
                    decider += arr[0][j-1];
                    //botmid
                    decider += arr[0][j];
                    //botright
                    decider += arr[0][0];

                    newGeneration[i][j] = testOfLife(decider,arr[i][j]);
                }
            }
        }
    }
    

    clearSite();
    initializeSite(newGeneration);
    return newGeneration;
}

//delete all site elements
function clearSite(){
    var node= document.getElementById("main");
    while (node.firstChild){
        node.removeChild(node.firstChild);
    }
}

//checks, wether the inspected cell survives, dies or turns alive
function testOfLife(number,currentCell){
    //RULES
    //https://playgameoflife.com/info rules
    //space that is populated, means a cell which has a 1
    
    if(currentCell == 1){
        //rule 1: each cell with one or no neighbors dies, as if by solitude.
        if(number<=1){
            return 0;
        //rule 2: each cell with four or more neighbors dies, as if by overpopulation.
        }else if(number>3){
            return 0;
        //rule 3: each cell with two or three neighbors survives. 
        }else if(number>1 && number<4){
            return 1;
        }
    //space that is unpopulated, means a cell which has a 0    
    }else if(currentCell == 0){
        //rule 4: each cell with three neighbors becomes populated. 
        if(number ==3){
            return 1;
        }else{
            return 0;
        }
    }
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
