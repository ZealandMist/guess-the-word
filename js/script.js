// The unordered list where the player’s guessed letters will appear.
const guessLetter = document.querySelector('.guessed-letters');

// The button with the text “Guess!” in it.
const guessBtn = document.querySelector('.guess');

// The text input where the player will guess a letter.
const letterInput = document.querySelector('.letter');

// The empty paragraph where the word in progress will appear.
const wordPrg = document.querySelector('.word-in-progress');

// The paragraph where the remaining guesses will display.
const remainGuess = document.querySelector('.remaining');

// The span inside the paragraph where the remaining guesses will display.
const remainSpan = document.querySelector('.remaining span');

// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector('.message');

// The hidden button that will appear prompting the player to play again.
const againBtn = document.querySelector('.play-again');

let word = "magnolia";

const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();
  updateProgress(word);
};

getWord();

const updateProgress = function(word){
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordPrg.innterText = placeholderLetters.join("");
};

updateProgress(word);

guessBtn.addEventListener('click', function(e){
  e.preventDefault();
  message.innerText = "";
  const inputValue = letterInput.value;
  
  const goodGuess = validInput(inputValue);
  
  if (goodGuess) {
    makeGuess(inputValue);
  }

  letterInput.value = "";
});

const validInput = function(input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function(guess){
  guess = guess.toUpperCase();

  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    guessCount(guess);
    guessAnswer();
    updateWordPrg(guessedLetters);
  }
};

const guessAnswer = function(){
  guessLetter.innerHTML = "";

  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessLetter.append(li);
  }
};

const updateWordPrg = function(guessedLetters){
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const wordReveal = [];
  
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      wordReveal.push(letter.toUpperCase());
    } else {
      wordReveal.push("●");
    }
  }
  wordPrg.innerText = wordReveal.join("");
  winGuess();
};

const guessCount = function(guess){
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)){
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0){
    message.innerHTML = `Sorry, your game is over. The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainSpan.innerText = `${remainingGuesses} guesses left`;
  }
};

const winGuess = function(){
  if (word.toUpperCase() === wordPrg.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};
