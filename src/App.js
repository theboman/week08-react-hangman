import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [wordbank, setWordBank] = useState([
    "old",
    "tired",
    "strange",
    "caulous",
    "superficial",
    "tennessee"
  ]);
  const [guessed, setGuessed] = useState([]); //guessed letters
  const [currentWord, setCurrentWord] = useState(""); //holds the computers word
  const [currentWordArray, setCurrentWordArray] = useState([]); // holds the converted string to array.
  const [currentCorrectLetters, setCurrentCorrectLetters] = useState([]); //will hold the correct gessed letters
  const [score, setScore] = useState(0);

  useEffect(() => {
    //console.log("1st");

    if (currentWord.length > 1) {
      build_underscores(currentWord);
      return;
    }
    chooseWord(wordbank);
  }, [currentWord, wordbank]);

  //this will randomly chose a word from the word bank
  function chooseWord(wordbank) {
    // random number of array length
    let randomNum = Math.floor(Math.random() * wordbank.length);
    let tempWord = wordbank[randomNum];
    let tempArray = tempWord.split("");

    setCurrentWord(tempWord);
    setCurrentWordArray(tempArray);
  }

  // this will build the array of underscores to the user to start guessing
  function build_underscores(currentWord) {
    let tempArray = [];
    for (var i = 0; i < currentWord.length; i++) {
      tempArray.push("_");
    }
    setCurrentCorrectLetters(tempArray);
  }

  // handles the input
  function textBox_Handler(e) {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  // button handler
  function guessSubmit_Handler(current_guess) {
    let tempArray = [];
    let numOfMatch = 0;
    tempArray = [...currentCorrectLetters];

    currentWordArray.forEach((myLetter, index) => {
      if (current_guess === myLetter) {
        // console.log(myLetter + " is at: " + index);
        tempArray[index] = current_guess;
        ++numOfMatch;
      }
    });

    if (numOfMatch === 0) {
      setScore(score + 1);
    }

    setCurrentCorrectLetters(tempArray);
    let newGuess = [...guessed];
    newGuess.push(current_guess);
    setGuessed(newGuess);
  }

  return (
    <div className="App">
      <div className="game_box">
        <div className="hangman">
          hangman {currentWord}
          <div className="score">score: {score}</div>
        </div>
        <div className="clue">
          "I am thinking of a word that is {currentWord.length} letters long."
        </div>
        <div className="currentLetters">
          {currentCorrectLetters.map((underscore, index) => {
            return (
              <div className="letter" key={index}>
                {underscore}
              </div>
            );
          })}
        </div>
        <div className="guessed_letters">guessed letters: {guessed}</div>
      </div>

      <input type="text" maxLength="1" size="1" onChange={textBox_Handler} />
      <button onClick={() => guessSubmit_Handler(input)}>Your Guess</button>
    </div>
  );
}
