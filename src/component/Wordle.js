import React, { useState } from 'react'
import { useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid.module';
import Keypad from './Keypad.module';
import Modal from './Modal.module';

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    // The first parameter is the type of the event (like "click" or "mousedown" or any other HTML DOM Event.)
    // The second parameter is the function we want to call when the event occurs.

    if (isCorrect) {
      // When guess is correct then detach the event listener
      console.log('congrats, you win!');
      setTimeout(()=> setShowModal(true),2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      // When out of guesses then detach the event listener
      console.log('unlicky, out of guesses');
      setTimeout(()=> setShowModal(true),2000);
      window.removeEventListener('keyup', handleKeyup);
    }
    return () => window.removeEventListener('keyup', handleKeyup);
    // event occurs when key is releases
  }, [handleKeyup, isCorrect, turn]);

  // useEffect(() => {
  //   console.log(guesses, turn, isCorrect);
  // }, [guesses, turn, isCorrect]); // when these (guesses, turn, isCorrect) three things change then this code run otherwise no
  // console.log(usedKeys);
  return (
    <div>
      {/* <div>Solution - {solution}</div>
      <div>Current guess - {currentGuess}</div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      { showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  );
}