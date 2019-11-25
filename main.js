const startBtn = document.getElementById("startButton");
const newGameBtn = document.getElementById("newGame");
let keyWord;
let keyWordArray =[];
let letter;
let usedCorrectLetters = [];
let usedBadLetters = [];
let negativePoints = 0;
let positivePoints = 0;
const permittedKeys = "qweęrtyuioópaąsśdfghjklłzżźxcćvbnńm";
let player=1;
let player1Points=1;
let player2Points=1;
let addPoints=false;
// document.getElementById('player1').textContent=player1Points;
// document.getElementById('player2').textContent=player2Points;

function displayPoints(){
        player=(-1)*player;
        if (addPoints == true){
                if (player<0){ //player1
                        console.log('p1 '+ player1Points);
                }    
                else if (player>0){ //player2
                        console.log('p2 '+ player2Points);
                }   
        }
        addPoints = false;  
}

startBtn.addEventListener("click", addWord)

newGameBtn.addEventListener("click", gameReset)
     
document.addEventListener("keypress", function uploadLetter(e){
        letter = e.key.toLowerCase();
        if (Array.from(permittedKeys).includes(letter)==false)
        {
                alert('nie mozesz uzyc tego znaku, mozesz uzyc tylko liter. Kliknij ok i backspace')
        }
        if (keyWordArray.length>0){
                letter = e.key.toLowerCase();
                checkLetter();
                chceckIfWin();
                }
})


function gameReset(){
        document.getElementById("menuTable").classList.remove("hide");
        document.getElementById("newGame").classList.add("hide");
        positivePoints = 0;
        negativePoints = 0;
        removeBoxes();
        removeImg();
        keyWord ="";
        keyWordArray=[];
        usedCorrectLetters = [];
        usedBadLetters = [];
        lockGame =false;
}
function addWord(keyWord){
        keyWord = document.getElementById("inputKeyWord").value;
        keyWord = keyWord.toLowerCase();
        keyWordArray = Array.from(keyWord);
        if(keyWordArray.length>15){
                alert('Dlugosc wyrazu nie moze miec wiecej niz 15 liter! dodaj slowo jeszcze raz');
                keyWord="";
                keyWordArray = [];
        }
        else{
                document.getElementById("menuTable").classList.add("hide");
                generateBoxes();
                generateImg();
        }

}
function generateImg(){
        removeImg();
        const img = document.createElement('img');
        document.getElementById("picture").appendChild(img);
        img.id="img";
        img.src=`hangmanPictures/${negativePoints}.png`;
}
function removeImg(){
        if (document.getElementById("img")!= null){
                document.getElementById("img").remove();
        }
}
function generateBoxes(){
        for (let i=0; i<keyWordArray.length; i++){
        const div = document.createElement('div');
        div.id = 'div'+i;
        div.textContent = keyWordArray[i];
        document.getElementById("divDisplay").appendChild(div);
        }
}
function removeBoxes(){
        for (let i =0; i<keyWordArray.length; i++){ 
                document.getElementById("div"+i).remove();
        }
}
function checkLetter(){
        if (usedCorrectLetters.concat(usedBadLetters).includes(letter)==true){
                //document.getElementById('alreadyUsed').textContent = 'uzyles juz litery '+ letter;
        }

        else if (keyWordArray.includes(letter) == true){
                for(let i=0; i <= keyWordArray.length; i++){
                        if (keyWordArray[i] == letter){
                                document.getElementById("div"+i).classList.add("correct");
                                positivePoints++;
                        }
                }
                usedCorrectLetters.push(letter);
        }
        else{
                usedBadLetters.push(letter);
                negativePoints++;
                generateImg();
        }
        return negativePoints, positivePoints;
}
function chceckIfWin(){
        if(negativePoints == 11)
        {              
                positivePoints=0;
                negativePoints=negativePoints-1;
                displayPoints();
                document.getElementById("newGame").classList.remove("hide");

        }
        else if((positivePoints) == keyWordArray.length)
        {
                addPoints= true;
                positivePoints=keyWordArray.length-1;
                negativePoints=0;
                displayPoints();
                document.getElementById("newGame").classList.remove("hide");
        }
        
}