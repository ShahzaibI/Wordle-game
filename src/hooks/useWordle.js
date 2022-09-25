// Make a custom hook
import { useState } from "react";
const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);// each guess in an array
    // above create array of 6 length on each index initial value is undefine
    const [history, setHistory] = useState([]);// each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);

    const [usedKeys, setUsedKeys] = useState({});//use for keypad color

    // handle keyup event & track current guess
    // if user presses enter then add the new guess
    const handleKeyup = ({ key }) => { //access key property of event
        // console.log(key);
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            })
        }
        if (key === 'Enter') {
            // only add guess if turn is less then 5
            if (turn > 5) { // Never used
               alert('You used all your guesses');
                return;
            }
            // do not allow duplicate word
            if (history.includes(currentGuess)) {
               alert('You already tried that word');
                return;
            }
            // check word is 5 char log
            if (currentGuess.length !== 5) {
               alert('Word must be 5 char long');
                return;
            }
            const formated = formatGuess();
            addNewGuess(formated);
        }
    }

    // Format a guess into an array of letter
    // e.g [{key: 'a', color: 'yellow}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        // convert string into separate character array (formatedGuess) & (solutionArray)
        let formatedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'gray' };
        })

        // find any green letters
        formatedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formatedGuess[i].color = 'green';
                solutionArray[i] = null; // I think this is not neccesory
            }
        })

        // find any yellow letters
        formatedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formatedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null; // I think this is not neccesory
            }
        })
        return formatedGuess;
    }

    // add a new guess to the guess state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formatedGuess) => { // formatedGuess parameter name
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formatedGuess;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        })
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })
        // below code for color the keypad buttons it will return object like {a:'green', b:'yellow', c:'gray',.....}
        setUsedKeys((prevUsedKeys) => { //old functionality pass a function in side
            let newKeys = { ...prevUsedKeys };
            formatedGuess.forEach((l) => {
                const currentColor = newKeys[l.key];// i.e (newKeys['a']) | access the color of previous used key

                if (l.color === 'green') {
                    newKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'gray';
                    return;
                }
            });
            // console.log(newKeys);
            return newKeys;
        })

        setCurrentGuess('');
        // console.log(usedKeys);
        // console.log('ok');
    }

    return { turn, currentGuess, guesses, isCorrect,usedKeys, handleKeyup };
}

export default useWordle;