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
const emptyPgraph = document.querySelector('.message');

// The hidden button that will appear prompting the player to play again.
const againBtn = document.querySelector('.play-again');

const word = "magnolia";

const updateProgress = function(word){
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordPrg.innterText = placeholderLetters.join("");
};

updateProgress(word);

guessBtn.addEventListener('click', function(e){
  e.preventDefault();
  const inputValue = letterInput.value;
  console.log(inputValue);
  letterInput.value = "";
});