//Variable to store sound when button is clicked
var clickSound = new Audio("sounds/onclick.mp3");
//variable to store theme sound of game
var soundtrack = new Audio("sounds/soundtrack.mp3");
//Integer variable to store the difficulty Level, 1 for easy, 2 for medium, 3 for hard.
var difficultyLevel;
//Main score of the player when game starts
var score = 0;
//charArray stores the characters that needs to be typed
//For example, for word AMBER, charArray = [A,M,B,E,R]
var charArray;
//charTyped stores the character that user types
var charTyped;
//Time when the game starts
var seconds = time[0];

/*
  What to do when user has typed the word correctly? This function answers this question
*/
function loadNextWord() {
  //ensuring that all the characters are typed
  var allCharTyped = 0;
  for (var i = 0; i < charArray.length; i++) {
    //Does the typed character array has both the classes in it ?  (Is it already checked)?
    if (charArray[i].className === "char checker") {
      allCharTyped = allCharTyped + 1;
    }
    //When the user has typed the characters CORRECTLY
    if (allCharTyped === charArray.length) {
      score++; // increment the score
      console.log("Correct word!");
      scoreParagraph.innerHTML = score; //add score to the score div
      //remove the event listener to avoid detecting typed keys unnecessarily
      document.removeEventListener("keydown", checkKey, false);

      //generate next word now
      setTimeout(function() {
        paraWord.className = "displayLine"; // reassign the class
        generateNewWord(); // give another word
        document.addEventListener("keydown", checkKey, false);
      }, 150);
    }
  }
}
/*
  The function checks whether the key typed matches the character inside charArray[].
*/
//The checkKey() function was inspired from (https://codereview.stackexchange.com/questions/122053/typing-game-in-javascript)
function checkKey(event) {
  // Source: http://www.yorku.ca/nmw/datt1939f17/javascript_all/js_onkeypress.html
  //The fromCharCode() method converts Unicode values into characters.
  var x = event.which || event.keyCode;; // Get the Unicode value when user types.
  charTyped = String.fromCharCode(x); // Convert the value into a character

  for (var i = 0; i < charArray.length; i++) {
    if (charArray[i].innerHTML === charTyped) { // if the letter typed is same as in the 'charArray'
      if (charArray[i].classList.contains("checker")) { // In case the there are two same characters next to each other like "MANNER", "TOO"
        continue;
        //colour the character
        /*
        * The first expression "charArray[i].classList.contains("checker") === false" ensures that the letter is not coloured.
        * The second expression "charArray[i - 1] === undefined" ensures the order is followed in the character.
        * The third expression "charArray[i - 1].classList.contains("checker") !== false" ensures that two same letters are not marked
          at the same time. Example: "ROSTER" two R's should not be marked together.
        */
      } else if (charArray[i].classList.contains("checker") === false && charArray[i - 1] === undefined || charArray[i - 1].classList.contains("checker") !== false) {
        //check the character and add colour/class to it.
        charArray[i].classList.add("checker");
        break;
      }
    }
  }
  //If all the characters are typed correctly, load the next word
  loadNextWord();
}

/*
  Geneates a random word from 'data.js' based on the difficulty level selected by the user and stores each character
  of the word inside charArray[] array.
*/
function generateNewWord() {
  paraWord.innerHTML = " ";
  //Selecting where to pick word from, EASY, MED, or HARD
  if (difficultyLevel == 1) {
    //randomly select any word from EASY
    var random = Math.floor(Math.random() * (data.easy.length));
    var selectedWord = data.easy[random].split("");
    //randomly select any sentence from MEDIUM
  } else if (difficultyLevel == 2) {
    var random = Math.floor(Math.random() * (data.medium.length));
    var selectedWord = data.medium[random].split("");
    //randomly select any sentence from HARD
  } else {
    var random = Math.floor(Math.random() * (data.hard.length));
    var selectedWord = data.hard[random].split("");
  }
  //charArray stores the characters that needs to be typed
  charArray = [];
  //iterate through the word/element which is selected
  //display the word on the screen
  for (var i = 0; i < selectedWord.length; i++) {
    //Store each character inside the span
    var char = createSpan(selectedWord[i]);
    //assign class to each character
    char.classList.add("char");
    //add the character to the word paragraph (Where words from array are displayed)
    paraWord.appendChild(char);
    //add the character to the 'charArray' array
    charArray.push(char);
  }
}
/*
  This functions runs last level.
*/
function updateLevel5() {

  seconds--;
  timeParagraph.innerHTML = seconds;

  if (seconds === 0) {
    scoreParagraph.innerHTML = score;
    //Game over
    paraWord.innerHTML = "Congratulations! Your final score is " + score;
    seconds = time[5];
    timeParagraph.innerHTML = seconds;
  } else {
    setTimeout(updateLevel5, 1000);
  }
}
/*
  This functions runs level 4 which has timer set to 15 seconds. User has 15 seconds to type
  as many words as he can.
*/
function updateLevel4() {

  seconds--;
  timeParagraph.innerHTML = seconds;
  if (seconds === 0) {
    paraWord.innerHTML = "Please click on next LEVEL";
    document.removeEventListener("keydown", checkKey, false);
    nextButton.disabled = false;
    var resultParagraph = createParagraph("Your score is: " + score);
    resultBox.appendChild(resultParagraph);

    scoreParagraph.innerHTML = score;
    seconds = time[4];
    timeParagraph.innerHTML = seconds;
    nextButton.onclick = function() {
      setTimeout(updateLevel5, 1000);
      generateNewWord();
      document.addEventListener("keydown", checkKey, false);
      nextButton.disabled = true;
    }
  } else {
    setTimeout(updateLevel4, 1000);
  }
}
/*
  This functions runs level 3 which has timer set to 20 seconds. User has 20 seconds to type
  as many words as he can.
*/
function updateLevel3() {

  seconds--;
  timeParagraph.innerHTML = seconds;

  if (seconds === 0) {
    paraWord.innerHTML = "Please click on next LEVEL";
    document.removeEventListener("keydown", checkKey, false);
    nextButton.disabled = false;
    var resultParagraph = createParagraph("Your score is: " + score);
    resultBox.appendChild(resultParagraph);

    scoreParagraph.innerHTML = score;
    seconds = time[3];
    timeParagraph.innerHTML = seconds;
    nextButton.onclick = function() {
      setTimeout(updateLevel4, 1000);
      generateNewWord();
      document.addEventListener("keydown", checkKey, false);
      nextButton.disabled = true;
    }
  } else {
    setTimeout(updateLevel3, 1000);
  }
}
/*
  This functions runs level 2 which has timer set to 30 seconds. User has 30 seconds to type
  as many words as he can.
*/
function updateLevel2() {
  //decrease time every time function runs
  seconds--;
  timeParagraph.innerHTML = seconds;

  if (seconds === 0) {
    paraWord.innerHTML = "Please click on next LEVEL";
    document.removeEventListener("keydown", checkKey, false);
    nextButton.disabled = false;
    var resultParagraph = createParagraph("Your score is: " + score);
    resultBox.appendChild(resultParagraph);

    scoreParagraph.innerHTML = score;
    seconds = time[2];
    timeParagraph.innerHTML = seconds;
    //What happens when 'nextButton' is clicked
    nextButton.onclick = function() {
      setTimeout(updateLevel3, 1000);
      generateNewWord();
      document.addEventListener("keydown", checkKey, false);
      nextButton.disabled = true;
    }
  } else {
    setTimeout(updateLevel2, 1000);
  }
}
/*
  This functions runs level 1 which has timer set to 40 seconds. User has 40 seconds to type
  as many words as he can.
*/
function updateLevel1() {
  //decrease time every time function runs
  seconds--;
  //add 'seconds' to the display
  timeParagraph.innerHTML = seconds;
  //When timer runs out
  if (seconds === 0) {
    //generate this text
    paraWord.innerHTML = "Please click on NEXT LEVEL";
    //removeEventListener
    document.removeEventListener("keydown", checkKey, false);
    //Show current Score
    var resultParagraph = createParagraph("Your score is: " + score);
    resultBox.appendChild(resultParagraph);
    //Display score to the paragraph
    scoreParagraph.innerHTML = score;
    //set timer to level 2
    seconds = time[1];
    //display it to the main timer box
    timeParagraph.innerHTML = seconds;

    //Generate the Next Level Button so when user clicks it next level loads.
    var nextButtonDiv = createDiv();
    window.nextButton = createButton("NEXT LEVEL");
    nextButton.classList.add("button");
    nextButtonDiv.appendChild(nextButton);
    containerBody.appendChild(nextButtonDiv);

    //What happens when 'nextButton' is clicked
    nextButton.onclick = function() {
      //Run level 2 function every 1000ms
      setTimeout(updateLevel2, 1000);
      //Generate new words
      generateNewWord();
      ////Start the checkKey function every time key is pressed
      document.addEventListener("keydown", checkKey, false);
      //Disable the 'nextButton'
      nextButton.disabled = true;
    }
  } else {
    setTimeout(updateLevel1, 1000);
  }
}

/*
  This function starrts the timer and assigns score to 0. Called inside startGameButtonHandler()
*/
function timer() {
  score = 0;
  //Repeat function updateLevel1, in every 1000ms, or 1 sec.
  setTimeout(updateLevel1, 1000);
}

/*
  The function loads the MAIN GAME and creates all the major elements. It is called inside levelButtonHandler().\
  The ouput looks like this in HTML :

<div class="divMenu"><button class="button" disabled="">Start typing!</button>
  <div class="mainContainer">
    <div>
      <span>SCORE:
        <p>0</p>
      </span></div>
    <div>
      <span>TIME:
        <p>34</p>
      </span></div>
  </div>
  <div class="WordContainer">
    <p class="displayLine"></p>
  </div>
  <div class="resultBox"></div>
  <div>
    <button class="backButton">Back to Main Menu
    </button>
  </div>
</div>

*/
function configureGameUI(level) {
  //MAIN DIV
  window.containerBody = createDiv();
  containerBody.classList.add("divMenu");

  //BUTTON to start Game
  window.btn = createButton("Start typing!");
  btn.classList.add("button");
  containerBody.appendChild(btn);

  //CONTAINER to store Scoring and Timing
  window.mainContainer = createDiv();
  mainContainer.classList.add("mainContainer");

  //Score
  window.container1 = createDiv();
  window.containerScore = createSpan("SCORE: ");
  window.scoreParagraph = createParagraph(score);
  containerScore.appendChild(scoreParagraph);
  container1.appendChild(containerScore);
  mainContainer.appendChild(container1);

  //Timer
  window.container2 = createDiv();
  window.containerTime = createSpan("TIME:");
  window.timeParagraph = createParagraph(seconds);
  containerTime.appendChild(timeParagraph);
  container2.appendChild(containerTime);
  mainContainer.appendChild(container2);

  containerBody.appendChild(mainContainer);

  //For storing words
  window.containerWord = createDiv();
  containerWord.classList.add("WordContainer");
  window.paraWord = createParagraph(" ");
  paraWord.classList.add("displayLine");
  containerWord.appendChild(paraWord);

  containerBody.appendChild(containerWord);

  //for storing results
  window.resultBox = createDiv();
  resultBox.classList.add("resultBox");
  containerBody.appendChild(resultBox);

  //back to Main menu button
  var backButtonDiv = createDiv();
  window.backButton = createButton("Back to Main Menu");
  backButton.classList.add("backButton");
  backButtonDiv.appendChild(backButton);
  containerBody.appendChild(backButtonDiv);

  backButton.onclick = function() {
    clickSound.play();
    clickSound.currentTime = 0;
    seconds = time[0];
    score = 0;
    document.body.innerHTML = " ";
    showMainMenu();
  }
  document.body.appendChild(containerBody);
}

/*
  The function handles event when "START TYPING!" button is clicked. Function is called inside
  levelButtonHandler().
*/

function startGameButtonHandler() {
  btn.onclick = function() {
    clickSound.play();
    clickSound.currentTime = 0;
    //Start the timer
    timer();
    //Generate random word word
    generateNewWord();
    //disable the 'START TYPING' button
    btn.disabled = true;
  }
  //Start the checkKey function every time key is pressed
  document.addEventListener("keydown", checkKey, false);
}

/*
  The function handles event when any difficulty level is selected or that button is clicked.
*/

function levelButtonHandler() {
  //When EASY is clicked
  btnEasy.onclick = function() {
    //play click sound
    clickSound.play();
    //reset the sound
    clickSound.currentTime = 0;
    //clear the body
    document.body.innerHTML = " ";
    //load the main game interface
    configureGameUI();
    //STARTING GAME FUNCTION
    startGameButtonHandler();
    //ASSIGNING THE DIFFICULTY LEVEL
    difficultyLevel = 1;
  }
  //When MEDIUM is clicked
  btnMed.onclick = function() {
    clickSound.play();
    clickSound.currentTime = 0;
    document.body.innerHTML = " ";
    configureGameUI();
    startGameButtonHandler();
    difficultyLevel = 2;
  }
  //When HARD is clicked
  btnHard.onclick = function() {
    clickSound.play();
    clickSound.currentTime = 0;
    document.body.innerHTML = " ";
    configureGameUI();
    startGameButtonHandler();
    difficultyLevel = 3;
  }
}
/*
  The function creates a page with 3 buttons to select the difficulty level, EAST, MEDIUM OR HARD.
*/
function createDifficultyMenu() {

  //Main DIV
  window.levelDiv = createDiv();
  levelDiv.classList.add("divMenu");
  levelDiv.classList.add("levelDiv");

  var heading = createH2("SELECT DIFFICULTY LEVEL");
  levelDiv.appendChild(heading);
  //EASY LEVEL BUTTON
  window.easy = createDiv();
  window.btnEasy = createButton("EASY");
  btnEasy.classList.add("button");
  easy.appendChild(btnEasy);
  //MEDIUM LEVEL BUTTON
  window.med = createDiv();
  window.btnMed = createButton("MEDIUM");
  btnMed.classList.add("button");
  med.appendChild(btnMed);
  //HARD LEVEL BUTTON
  window.hard = createDiv();
  window.btnHard = createButton("HARD");
  btnHard.classList.add("button");
  hard.appendChild(btnHard);

  levelDiv.appendChild(easy);
  levelDiv.appendChild(med);
  levelDiv.appendChild(hard);

  document.body.appendChild(levelDiv);
}
/*
  The function creates a page with game instructions and rules.
*/
function loadInstruction() {
  //Main DIV
  window.divInst = createDiv();
  divInst.classList.add("divMenu");
  //Heading for page
  var heading2 = createH2("Game Rules");
  var rulesPara = createParagraph("The goal in this game is to type as many words and sentences as possible before the timer runs out. User can select the difficulty level (easy, medium and hard) and then start the game. 'Easy' will contain simple words in English, 'medium' will contain 3 to 4 words, 'hard' contains random characters and letters. There are 7 levels inside the gameplay based on time. Level 1 has timer set for 40 seconds, level 2 for 30 seconds and so on.");
  rulesPara.classList.add("rulesPara");
  //Back Button to go to main menu
  window.backButton = createButton("Back to Main Menu");
  backButton.classList.add("backButton");
  //What happens when 'backButton' is pressed?
  backButton.onclick = function() {
    clickSound.play();
    clickSound.currentTime = 0;
    document.body.innerHTML = " ";
    showMainMenu();
  }
  divInst.appendChild(heading2);
  divInst.appendChild(rulesPara);
  divInst.appendChild(backButton);
  document.body.appendChild(divInst);

}

/*
  This function generates HTML elements for storing, Game rules, Difficulty level. Generates
  two buttons and one heading to display on main Menu page. Following structure is the output:

  <div class="divMenu"><h1>HITKEYS</h1>
    <div>
      <button>Game Rules</button>
    </div>
    <div>
      <button>Select Difficulty Level</button>
    </div>
  </div>
*/

function createMainScreen() {
  //MAIN DIV
  window.divMenu = createDiv();
  divMenu.classList.add("divMenu");
  var heading1 = createH1("HITKEYS");
  heading1.classList.add("fadeIn");
  //Button for game rules
  var instDiv = createDiv();
  window.instButton = createButton("Game Rules");
  instDiv.appendChild(instButton);
  //button to select difficulty level
  var diffDiv = createDiv();
  window.diffButton = createButton("Select Difficulty Level");
  diffDiv.appendChild(diffButton);

  divMenu.appendChild(heading1);
  divMenu.appendChild(instDiv);
  divMenu.appendChild(diffButton);

  document.body.appendChild(divMenu);
}
/*
  This function gives Shows the Main menu and sets events for every button clicked.
*/
function showMainMenu() {
  console.log("Showing Main Menu");
  //create all the HTML elements for main menu
  createMainScreen();
  //add events listeners
  instButton.onclick = function() {
    //play click sound
    clickSound.play();
    //reset sound
    clickSound.currentTime = 0;
    //clear the screen
    document.body.innerHTML = " ";
    loadInstruction();
  }
  diffButton.onclick = function() {
    //play soundtrack
    soundtrack.play();
    //play click sound
    clickSound.play();
    clickSound.currentTime = 0;
    document.body.innerHTML = " ";
    createDifficultyMenu();
    levelButtonHandler();
  }
}
/*
  This function loads the application and shows the main menu.
*/
function loadApplication() {
  console.log("Application Loaded.");
  showMainMenu();
}
//What happens when the program starts?
window.onload = loadApplication;
