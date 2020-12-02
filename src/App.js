import React, { useState, useEffect } from "react";
//import Body from "./components/Body";
import "./styles.css";
import { motion } from 'framer-motion';

import Modal from './components/Modal';



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
  const [currentCorrectLetters, setCurrentCorrectLetters] = useState([]); //will hold the correct gussed letters
  const [score, setScore] = useState(0);
  const [showhangman, setShowhangman] = useState([]); //show the different parts of the hangman SVG
  const [modal, setModal] = useState(true);


  useEffect(() => {

    if (currentWord.length > 1) {
      build_underscores(currentWord);
      return;
    }
    chooseWord(wordbank);
    console.log("use effect called here!");
  }, [currentWord, wordbank]);

  //this will randomly chose a word from the word bank
  function chooseWord(inputbank) {
    // random number from array length 
    let randomNum = Math.floor(Math.random() * inputbank.length);
    let tempWord = inputbank[randomNum];
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
  function input_Handler(e) {
    //console.log(e.target.value);
    setInput(e.target.value);
    // was missing 2 way binding

  }

  // button handler
  function guessSubmit_Handler(current_guess) {
    let tempArray = [];
    let numOfMatch = 0;
    tempArray = [...currentCorrectLetters];

    //check the current word for matches, even if more than one
    currentWordArray.forEach((myLetter, index) => {
      if (current_guess === myLetter) {
        // console.log(myLetter + " is at: " + index);
        tempArray[index] = current_guess;
        ++numOfMatch;
      }
    });

    //setting the score with wrong guess
    if (numOfMatch === 0) {
      setScore(score + 1);
      //add an element to the hang array to how body parts 1-6
      //doesn't matter what you add to this array
      let newHangArray = [...showhangman];
      newHangArray.push(current_guess);
      setShowhangman(newHangArray);
      setModal(true);

    }

    // set the display to show the correct letter
    // and set the display of the guessed letters
    setCurrentCorrectLetters(tempArray);
    let newGuess = [...guessed];
    newGuess.push(current_guess);
    setGuessed(newGuess);
    setInput("");
    console.log('end of btn?')
  }

  //framer-motion variants
  const bodyVariants = {
    init: { pathLength: 0 },
    anim: { pathLength: 1 }
  }

  console.log(`This is input: ${input}`);
  console.log(`This is guessed letters: ${guessed}`);

  return (

    <div className="App">
      <Modal modal={modal} setModal={setModal} />
      <div className="game_box">
        <div className="game">
          hangman: {currentWord}
          <div className="score">score: {score}</div>
          <svg className="hangman" viewBox="-50 -8 240 160">
            <g className="hangmanSVG" transform="matrix(.95 0 0 .95 64 18)">
              {showhangman[0] && <circle cx="35.83" cy="12.5" r="12" className="head" />}
              {showhangman[1] && <motion.path variants={bodyVariants} initial="init" animate="anim" d="M32.34 24.62L32.34 70.62" className="body" />}
              {showhangman[2] && <motion.path variants={bodyVariants} initial="init" animate="anim" d="M32.34 28.62L0.34 58.62" className="left_arm" />}
              {showhangman[3] && <motion.path variants={bodyVariants} initial="init" animate="anim" d="M32.34 28.62L64.34 58.62" className="right_arm" />}
              {showhangman[4] && <motion.path variants={bodyVariants} initial="init" animate="anim" d="M32.34 70.62L54.34 115.62" className="right_leg" />}
              {showhangman[5] && <motion.path variants={bodyVariants} initial="init" animate="anim" d="M32.34 70.62L10.34 115.62" className="left_leg" />}
            </g>


            <g className="gallow">
              <line className="cls-1" x1="96" y1="17" x2="96" y2="1" />
              <line className="cls-1" x1="25" y1="1" x2="97" y2="1" />
              <line className="cls-1" x1="26" y1="1" x2="26" y2="147" />
              <line className="cls-2" x1="43" y1="1" x2="26" y2="17" />
              <line className="cls-1" y1="147" x2="135" y2="147" />
              <line className="cls-2" x1="39" y1="1" x2="26" y2="13" />
            </g>
          </svg>
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
        <div className="guessed_letters">Guessed Letters:{guessed}</div>
      </div>

      <input type="text" maxLength="1" size="1" onChange={input_Handler} value={input} />
      <button onClick={() => guessSubmit_Handler(input)}>Your Guess</button>
    </div >
  );
}
