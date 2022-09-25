import React from 'react'

export default function Row({ guess, currentGuess }) {
  if (guess) {
    // console.log('new----------------------');
    // console.log('starting if');
    return (
      <div className='row past'>
        {guess.map((l, i) => (
          <div key={i} className={l.color}>{l.key}</div>
        ))}
      </div >
    )
  }
  if (currentGuess) {
    let letters = currentGuess.split('');
    // console.log('current execute');
    return (
      <div className='row current'>
        {letters.map((letter, i) => (
          <div key={i} className="filled">{letter}</div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }
  // console.log('last return');
  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
