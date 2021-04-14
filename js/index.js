function addButtons(){
    var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for(i=0; i<letters.length;i++){
        var button = document.createElement("input");         
        button.setAttribute("id", letters[i]);
        button.setAttribute("type", "submit");
        button.setAttribute("value", letters[i]);
        //TODO: find better way to store textfield information
        var test = document.getElementById("textfield").value; 
        button.onclick = function() {storeButtonChosen(this.value, test)};
        
        var form = document.getElementById("buttonForm");
        form.appendChild(button);
    }
    
}

function storeButtonChosen(input, input2){
    sessionStorage.setItem("buttonChosen", input);
    sessionStorage.setItem("text", input2);
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
