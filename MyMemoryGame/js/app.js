//The Variables

const cardList = ['fa-anchor','fa-anchor','fa-bicycle','fa-bicycle','fa-empire','fa-empire','fa-bomb','fa-bomb',
'fa-gamepad','fa-gamepad','fa-diamond','fa-diamond','fa-leaf','fa-leaf','fa-beer','fa-beer'];

let hand = [];
let time = 0;
let timerON = 0;
let moveCount = 0;

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", startOver);

//Start Over or Reset Game
function startOver(){
	shuffle(cardList);
	clearCards();
	assignCards();
	hand= [];
	timerON= 0;
	time= 0;
    document.getElementById("output").innerHTML = "00:00";
	moveCount= 0;
    document.querySelector(".moves").innerHTML= moveCount;
	starGradeReset();
};


// Shuffle function 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//this clears the classes for both the state of the cards and the identity of the cards.  
function clearCards(){
	$('ul.deck').children().removeClass().addClass("card");  
	$('ul.deck').children().children().removeClass().addClass("pending");
};

//the loop to get the arrayed cards in the i classes.
function assignCards(){
	const iconList = document.getElementsByClassName("pending");
	for (let i = 0; i < 16; i++){
		iconList[i].classList.add("fa",cardList[i]);
	}
	$('ul.deck').children().children().removeClass("pending");  
};



//Listens for the cards being clicked on
const laidCards = document.querySelector(".deck");
	laidCards.addEventListener("click", flipCard);

//Turns the cards over to be compared	
function flipCard(evt){
	startTimer();
	let theCard = evt.target.classList;
	
	if(theCard == "card" && hand.length < 2){
		evt.target.classList.add("open", "show");
		hand.push(evt.target);
		
		if(hand.length === 2 && hand[0].children[0].classList[1] == hand[1].children[0].classList[1]){
			hand[0].classList.add("match");
			hand[1].classList.add("match");
		    hand.length = 0;
			turnCounter();
		    }else{if(hand.length === 2){
				setTimeout(function(){
				  hand[0].classList.remove("open", "show");
				  hand[1].classList.remove("open", "show");
				  hand.length = 0;
				  turnCounter();
				}, 900);
			    }
	        }
	}
};
	
//Starts the Timer if it hasn't already been started
function startTimer(){
	if(timerON == 0){
		timerON = 1;
		tickTock();
	}
};

//Stops the Game
function stopGame(){
	if ($(".card").length == $(".match").length) {
	  timerON= 0;
	  setTimeout(function(){
		alert("Congratulations!  You matched all 16 cards!  It took you " + time + " seconds and " + moveCount + " turns, which gives you a star rating of "
		+ document.querySelectorAll(".fa-star").length + ".")
	  },400)	
    }
};
	
//The Timer
function tickTock(){
	if(timerON == 1){
		setTimeout(function(){
			time++;
			let mins = Math.floor(time/60);
			let secs = Math.floor(time%60);
			if(mins < 10){
				mins = "0" + mins;
			} 
			if(secs < 10){
				secs = "0" + secs;
			}
			document.getElementById("output").innerHTML = mins + ":" + secs;
			tickTock();
		},1000)
	}
};

//Counts the number of times you turned a pair over.
function turnCounter(){
	moveCount++;
	document.querySelector(".moves").innerHTML= moveCount;
    starJudge();
	stopGame();
}
 
//Gives the star rating. 
function starJudge(){
	const sparent= document.querySelector(".stars");
	if(moveCount > 12 && moveCount < 16){
		sparent.children[0].children[0].classList.remove("fa-star");
	}
	else if(moveCount >= 16 && moveCount < 18){
		sparent.children[1].children[0].classList.remove("fa-star");
	}
	else if(moveCount >= 18){
		sparent.children[2].children[0].classList.remove("fa-star");
	}	
};

//Resets the star rating.
function starGradeReset(){
  const starPresence= document.querySelector(".stars")
  for (let j = 0; j < 3; j++){
    if((starPresence.children[j].children[0].classList.contains("fa-star"))== false){
      starPresence.children[j].children[0].classList.add("fa-star")
    }
  }
};  