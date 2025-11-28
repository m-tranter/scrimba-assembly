import { useState } from "react";
import Status from './components/Status';
import Lang from './components/Lang';
import Alpha from './components/Alpha';
import Letter from './components/Letter';
import { languages } from './languages.js'
import { getWord } from "./utils.js";
import Confetti from 'react-confetti';


export default function Hangman() {
  const [langs, setLangs] = useState(languages.map((e) => { return { ...e, status: true } }))
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [letters, setLetters] = useState(Array.from(Array(26)).map((_, i) => {
    let k = String.fromCharCode(i + 65);
    return { letter: k, status: 'unused' };
  }));
  const [lastGuess, setLastGuess] = useState(null);
  const [status, setStatus] = useState(null)

  const newGame = () => {
    setCurrentWord(getWord());
    setStatus(null);
    setLastGuess(null)
    setLetters(prev => prev.map(l => (
      { ...l, status: "unused" }
    )));
    setLangs(prev => prev.map(l => ({ ...l, status: true })
    ))
  }

  const keyClick = (l) => {
    setLetters(prev => {
      let newStatus = null;
      let newLetters = prev.map(el => {
        setLastGuess(l)
        if (el.letter !== l) {
          return el;
        } else if (currentWord.includes(l)) {
          newStatus = "correct";
          return { ...el, status: "yes" };
        }
        else {
          newStatus = "wrong";
          // Update languages
          setLangs(prev => {
            let ind = prev.indexOf(prev.find((e) => e.status));
            return prev.map((e, i) => i === ind ? { ...e, status: false } : e)

          })
          return { ...el, status: "no" };
        }
      })
      // Check if player has won
      let guessed = newLetters.filter(l => l.status === "yes").map(e => e.letter);
      if (currentWord.split("").every(l => guessed.includes(l))) {
        newStatus = "won";
      }
      // Check if player has lost
      setWrongGuesses(newLetters.filter(l => l.status === 'no').length)
      if (wrongGuesses === languages.length - 1) {
        newStatus = "lost"
      }
      setStatus(newStatus)
      return newLetters
    })
  }

  let board = currentWord.split('').map((e, i) =>
    <Letter key={i}
      letter={e}
      status={letters.filter(l => l.status === "yes").map(e => e.letter).includes(e)}
      lost={status === 'lost'} />
  )
  let gameOver = status === "won" || status === "lost";

  return (
    <main>
      {status === "won" && <Confetti />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <Status status={status} lang={wrongGuesses ? langs[wrongGuesses - 1].name : ""} />
      <section className="langs">
        {langs.map(e => <Lang key={e.name} data={e} />)}
      </section>
      <section className="current-word">
        {board}
      </section>
      <section aria-live="polite" role="status" className="sr-only">
        {!gameOver ?
          <p>You have {languages.length - wrongGuesses} guess(es) left.</p>
          : null}
        {!lastGuess ? null :
          currentWord.includes(lastGuess) ?
            <p>Correct, {lastGuess} is in the word.</p>
            : <p>Sorry, {lastGuess} is not in the word.</p>
        }
        <p>Current word: {currentWord.split('').map(e => letters.find(l => l.letter === e).status === 'yes' ? `${e}.` : "blank.").join(' ')}</p>
      </section>
      <section className="alpha">
        {letters.map(l => <Alpha key={l.letter} gameState={status} status={l.status} letter={l.letter} keyClick={() => keyClick(l.letter)} />)}
      </section>
      {
        gameOver ?
          <button onClick={newGame} className="new-game">New game</button>
          : null
      }
    </main>
  )
}
