//create the alphabet buttons to decide which charakter should turn into life
function addButtons(){
    var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','RANDOM SMALL SHAPE','RANDOM BIG SHAPE','BY SEED'];
    var placed = false;
    for(i=0; i<letters.length;i++){
        var button = document.createElement("input");         
        button.setAttribute("id", letters[i]);
        if(i<26){
            button.setAttribute("class", "letter");
        }else{
            if(placed==false){
                var par = document.createElement("p");
                var node = document.createTextNode("Press these to get a glimpse of the default game, a version with fancier shapes or a preseeded game.");
                par.appendChild(node);
                par.setAttribute("id", "lucky");
                var form = document.getElementById("buttonForm");
                form.appendChild(par);
                placed=true;
            }
            button.setAttribute("class", "random");
        }
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
            var num1 = 57;
            var num2 = 208;
            var finalArray = arrProducer(fulltext,num1,num2);
            //first instance of the cells
            initializeSite(finalArray);

            interval = null;
            var startBTN = document.getElementById("start");
            var stopBTN = document.getElementById("stop");
            var slider = document.getElementById("rangeSlider");
            var timer = slider.value;
            
            //generationcounter
            var generationCount = 1;
            var generation = document.getElementById("generation");
            var generationNodeText = document.createTextNode("Generation: ");
            var generationNodeCount = document.createTextNode(generationCount);
            generation.append(generationNodeText);
            generation.append(generationNodeCount);

            //display the seed for big shapes, because its short
            if(sessionStorage.getItem("seedButton")=="RANDOM BIG SHAPE"){
                var seed = document.getElementById("seed");
                var seedNodeText = document.createTextNode("Seed: ");
                var seedCode = document.createTextNode(sessionStorage.getItem("seed"));
                seed.append(seedNodeText);
                seed.append(seedCode);
            }
            

            //looks ugly but works
            //https://stackoverflow.com/questions/29173956/start-and-stop-loop-in-javascript-with-start-and-stop-button/29174952
            
            //starts the game
            startBTN.onclick = function () {
                interval = setInterval(function () {
                    finalArray = refreshPage(finalArray);  // this is inside your loop
                    generationCount += 1;
                    generation.removeChild(generation.childNodes[1]);
                    generationNodeCount = document.createTextNode(generationCount);
                    generation.append(generationNodeCount);
                }, timer);
            };
            //pauses the game
            stopBTN.onclick = function () {
                clearInterval(interval);
            };

            //lets you change the speed in which generations evolve
            slider.onchange = function () {
                clearInterval(interval);
                timer = slider.value;
                startBTN.click();
            }  
        break;

        case 1920:
            var num1 = 57;
            var num2 = 156;
            var finalArray = arrProducer(fulltext,num1,num2);
            //first instance of the cells
            initializeSite(finalArray);

            interval = null;
            var startBTN = document.getElementById("start");
            var stopBTN = document.getElementById("stop");
            var slider = document.getElementById("rangeSlider");
            var timer = slider.value;
            
            //generationcounter
            var generationCount = 1;
            var generation = document.getElementById("generation");
            var generationNodeText = document.createTextNode("Generation: ");
            var generationNodeCount = document.createTextNode(generationCount);
            generation.append(generationNodeText);
            generation.append(generationNodeCount);

            //display the seed for big shapes, because its short
            if(sessionStorage.getItem("seedButton")=="RANDOM BIG SHAPE"){
                var seed = document.getElementById("seed");
                var seedNodeText = document.createTextNode("Seed: ");
                var seedCode = document.createTextNode(sessionStorage.getItem("seed"));
                seed.append(seedNodeText);
                seed.append(seedCode);
            }
            
            //looks ugly but works
            //https://stackoverflow.com/questions/29173956/start-and-stop-loop-in-javascript-with-start-and-stop-button/29174952
            
            //starts the game
            startBTN.onclick = function () {
                interval = setInterval(function () {
                    finalArray = refreshPage(finalArray);  // this is inside your loop
                    generationCount += 1;
                    generation.removeChild(generation.childNodes[1]);
                    generationNodeCount = document.createTextNode(generationCount);
                    generation.append(generationNodeCount);
                }, timer);
            };
            //pauses the game
            stopBTN.onclick = function () {
                clearInterval(interval);
            };

            //lets you change the speed in which generations evolve
            slider.onchange = function () {
                clearInterval(interval);
                timer = slider.value;
                startBTN.click();
            }    
        break;

        default:
        alert("Unexpected Screensize");
    }
}

//turn the text to an array of arrays, where information is stored
//selected charakter turns to 1, all other to 0
function arrProducer(text, height,width){
    var num2 = height;
    var num1 = width;
    var num3 = num1 * num2;
    var arrToFill = twoDimArray(height,width);
    var random = false;
    
    //if user pressed the random button then change the text to a random text and set the button to A
    if(sessionStorage.getItem("buttonChosen")=="RANDOM SMALL SHAPE" || sessionStorage.getItem("buttonChosen")=="RANDOM BIG SHAPE"){
        while(checkEmpty(text)!=false){
            text = produceRandomText(num3,height,width);
        }
        random = true;
    }else if(sessionStorage.getItem("buttonChosen")=="BY SEED"){
        if(text.length !=0){
            text = seedToText(sessionStorage.getItem("text"),num3);
            random = true;
        }else{
            alert("Seed was empty!"); 
        }
        
    }

    if(text.length>num3 ){
        if(random==false){
            alert("Text was too big for application, it got reduced to screensize");
        }
        text = text.slice(0, num3);
    }
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
    return arrToFill;
}

//produces a random string containing A's and B's which later translate to 1 & 0 
function produceRandomText(textLength,height, width){
    var randomText = "";
    var seedArr = new Array();
    //make smaller shapes and scatter them on the field
    if(sessionStorage.getItem("buttonChosen")=="RANDOM SMALL SHAPE"){
        sessionStorage.setItem("seedButton","RANDOM SMALL SHAPE");
        sessionStorage.setItem("buttonChosen", "A");
            for(i = 0; i<textLength; i++){
            var test = Math.floor(Math.random() * 10); 
            if(test>=8){
                randomText += "A";
                seedArr[i] = 1;
            }else{
                randomText += "B";
                seedArr[i] = 0;
            }
        }
        //save the text so it can be read in console
        sessionStorage.setItem("text", randomText);
        textToSeed(textLength, randomText, seedArr, "SMALL")
        return randomText;
    }else{
        //make bigger shapes by copy pasting bigger text chunks them more often
        sessionStorage.setItem("seedButton","RANDOM BIG SHAPE");
        sessionStorage.setItem("buttonChosen", "A");
        var subString = "";
        var seedArr = new Array();
        for(i = 0; i<(Math.floor(Math.random() * 10)+7); i++){
            var test = Math.floor(Math.random() * 10); 
            if(test>=7){
                subString += "A";
            }else{
                subString += "B";
            }
        }
        var seedString = subString;
        
        var counter = 0;
        while (randomText.length<textLength){
            seedArr[counter] = (Math.floor(Math.random() * 3)+3);
            for(i = 0; i<seedArr[counter]; i++){
                subString += subString;
            }

            if(subString.length >= textLength){
                randomText = subString;
            }
            counter++;
        }
        sessionStorage.setItem("text", randomText);
        sessionStorage.setItem("seedArr", seedArr);
        randomText = randomText.slice(0,textLength);
        if(checkEmpty(randomText)==false){
            textToSeed(textLength,seedString,seedArr,"BIG");
        }
        return randomText;
        }

}  

//create a seed for big shapes to share with friends
//seed format: converted width*sizeXseed textXnumbersXofXcopy paste repititions
function textToSeed(size, seedText, seedArr, type){
    var seed = "";
    //save the screen resolution
    seed = seed + size;
    
    if(type == "BIG"){
        //save the seedtype
        seed += "X" + 0;
        //save the initial string
        seed += "X" + seedText;
        //save the times it got copy and pasted
        for(i = 0; i<seedArr.length;i++){
            if(seedArr[i]!=","){
                seed += "X" + seedArr[i];
            }
        } 
        //output the final seed
        sessionStorage.setItem("seed",seed);
    }else if(type == "SMALL"){
        //save the seedtype
        seed += "X" + 1;
        
        //max size 52 for now, which preserves every bit
        var size = 52;

        //convert a size long string into a number which then can be decoded as binary number
        var stringg = "";
        for(i = 0; i<seedArr.length; i+=size){
            var sum = 0;
            var arrCopy = new Array();
            for(j = 0; j<size; j++){
                arrCopy[j]=seedArr[i+j];
                stringg += seedArr[i+j];
                if(arrCopy[j]==1){
                    sum += Math.pow(2,j);
                }
            }
            seed += "X" + sum;
        }  

        //output the final seed, for now in console
        //TODO output on site 
        console.log(seed);
    }
}

//reconstruction of seed to text
function seedToText(seed){
    var splitSeed = seed.split("X");

    var size = splitSeed[0];
    var seedArr = new Array();
    if(splitSeed[1]==0){
        var seedText = splitSeed[2];
        var index = 0;
        for(i = 3; i<splitSeed.length; i++){
            seedArr[index] = splitSeed[i];
            index++;
        }

        var finalArray = produceSeededText(size,seedText,seedArr,splitSeed[1]);
        finalArray = finalArray.slice(0,size);
        return finalArray;
    }else if(splitSeed[1]==1){
        sessionStorage.setItem("buttonChosen", "A");
        finalText = "";
        for(i = 2; i<splitSeed.length;i++){
            var decider = false;
            var number = splitSeed[i];
            var counter = 0;
            while(number > 0){
                if(number%2 ==1){
                    finalText += "A";
                }else{
                    finalText += "B";
                }
                number = Math.floor(number/2);
                counter += 1;
            }

            if(counter<52){
                var remaining = 52-counter;
                for(j = 0; j<remaining; j++){
                    finalText += "B";
                }
            }
        }

        finalText = finalText.slice(0,size);
        return finalText;
    }
    
}

//reconstruct the text from seed
function produceSeededText(textLength,seedString, seedArray,type){
    if(type==0){
        var randomText = "";
        sessionStorage.setItem("buttonChosen", "A");
        var subString = seedString;
        var seedArr = seedArray;
        var counter = 0;
        while (randomText.length<textLength){
            for(i = 0; i<seedArr[counter]; i++){
                subString += subString;
            }

            if(subString.length >= textLength){
                randomText = subString;
            }
            counter++;
            if(counter==seedArr.length){   
                randomText=subString;
                break;
            }
        }
        return randomText;
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

//delete all site elements
function clearSite(){
    var node= document.getElementById("main");
    while (node.firstChild){
        node.removeChild(node.firstChild);
    }
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

//for testing purposes
function variableThroughSites(){
    var buttonChosen = sessionStorage.getItem("text");
    var tag = document.createElement("p");
    var text = document.createTextNode(buttonChosen);
    tag.appendChild(text);
    var element = document.getElementById("main");
    element.appendChild(tag);

    //for other testing purposes
    /*var help="";
        for(i=0;i<12273;i++){
            if(12272%i==0){
                help += i + "X";
            }
        }
    console.log(help);*/
}

//check if the array created by randomness is empty return true false
function checkEmpty(array){
    var sum = 0;
    for(i = 0; i<array.length; i++){
        for(j = 0; j<array[i].length;j++){
            if(array[i][j] == "A"){
                sum += 1;
            }
        }
    }
    if(sum == 0){
        return true;
    }else{
        return false;
    }
}