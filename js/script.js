const guessLetter = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordPrg = document.querySelector(".word-in-progress");
const remainGuess = document.querySelector(".remaining");
const remainSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();
  placeholder(word);
};

getWord();

const placeholder = function(word){
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordPrg.innerText = placeholderLetters.join("");
};

guessBtn.addEventListener("click", function(e){
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  
  const goodGuess = validateInput(guess);
  
  if (goodGuess) {
    makeGuess(guess);
  }

  letterInput.value = "";
});

const validateInput = function(input) {
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
    // console.log(guessedLetters);
    guessCount(guess);
    showGuessedLetters();
    updateWordPrg(guessedLetters);
  }
};

const showGuessedLetters = function(){
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
    startOver();
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
    startOver();
  }
};

const startOver = function(){
  guessBtn.classList.add("hide");
  remainGuess.classList.add("hide");
  guessLetter.classList.add("hide");
  againBtn.classList.remove("hide");
};

againBtn.addEventListener("click", function(){
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainSpan.innerText = `${remainingGuesses} guesses`;
  guessLetter.innerHTML = "";
  message.innerText = "";

  getWord();

  guessBtn.classList.remove("hide");
  againBtn.classList.add("hide");
  remainGuess.classList.remove("hide");
  guessLetter.classList.remove("hide");
});