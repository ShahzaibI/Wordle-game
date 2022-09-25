import React from 'react'
import Row from './Row.module'

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />
        }
        return <Row guess={g} key={i} />;
      })}
    </div>
  )
}
