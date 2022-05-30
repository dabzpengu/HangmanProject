import { useEffect, useState } from "react";
import "./styles.css";
import Guide from "./components/Guide";

import dictionary, {
  addCompletedWord,
  addTheme,
  addWord,
  completedWords
} from "./data";

function Start(props) {
  const [wordInput, setWordInput] = useState("");
  const [themeInput, setThemeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [themeSelect, setThemeSelect] = useState("FRUIT");

  return (
    <>
      <h1 className="mainHeader">HANGMAN</h1>
      Win: {props.win}
      <br />
      Lose: {props.lose}
      <br />
      <input
        value={themeInput}
        onChange={(event) => setThemeInput(event.target.value)}
      />
      <button
        onClick={() => {
          const upperCaseTheme = themeInput.toUpperCase();
          if (themeInput && !Object.keys(dictionary).includes(upperCaseTheme)) {
            addTheme(upperCaseTheme);
            setThemeInput("");
          } else {
            setErrorMessage("Invalid theme. Try again.");
            setThemeInput("");
            setTimeout(() => setErrorMessage(""), 2500);
          }
        }}
      >
        Add theme
      </button>
      <br />
      <select
        value={themeSelect}
        onChange={(event) => setThemeSelect(event.target.value)}
      >
        {Object.keys(dictionary).map((theme) => (
          <option value={theme}>{theme}</option>
        ))}
      </select>
      <input
        value={wordInput}
        onChange={(event) => setWordInput(event.target.value)}
      />
      <button
        onClick={() => {
          const upperCaseWord = wordInput.toUpperCase();
          if (
            wordInput &&
            [...upperCaseWord].every(
              (letter) => letter === " " || alphabet.includes(letter)
            ) &&
            !dictionary[themeSelect].includes(upperCaseWord)
          ) {
            addWord(themeSelect, upperCaseWord);
            setWordInput("");
            setErrorMessage("");
          } else {
            setErrorMessage("Invalid word. Try again.");
            setWordInput("");
            setTimeout(() => setErrorMessage(""), 2500);
          }
        }}
      >
        Add Word
      </button>
      <br />
      <button onClick={props.onClick}>Start Game</button>
      <br />
      {errorMessage && <h1 className="error">{errorMessage}</h1>}
      <br />
    </>
  );
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomPair() {
  const filteredThemes = Object.keys(dictionary).filter(
    (theme) => theme.length !== 0
  );
  const randomTheme =
    filteredThemes[Math.floor(Math.random() * filteredThemes.length)];
  const words = dictionary[randomTheme];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  return [randomTheme, randomWord];
}

function Game(props) {
  const [pair, setPair] = useState(randomPair());
  const [correctLetters, setCorrectLetters] = useState([]);
  const [falseLetters, setFalseLetters] = useState([]);
  const [status, setStatus] = useState("play");
  const hint = pair[0];
  const [hintVisibility, setHintVisibility] = useState(false);

  function handleLetter(letter) {
    if (!(correctLetters.includes(letter) || falseLetters.includes(letter))) {
      if (pair[1].includes(letter)) {
        setCorrectLetters(correctLetters.concat(letter));
      } else {
        setFalseLetters(falseLetters.concat(letter));
      }
    }
  }

  function checkStatus() {
    if (
      [...pair[1]].every(
        (letter) => letter === " " || correctLetters.includes(letter)
      )
    ) {
      setStatus("win");
      addCompletedWord(pair[1], "win");
    } else if (falseLetters.length >= 6) {
      setStatus("lose");
      addCompletedWord(pair[1], "lose");
    }
  }

  useEffect(checkStatus, [falseLetters, correctLetters]);
  useEffect(() => {
    status === "win" ? props.onWin() : status === "lose" && props.onLose();
  }, [status]);

  function restart() {
    setCorrectLetters([]);
    setFalseLetters([]);
    setStatus("play");
    setPair(randomPair());
    setHintVisibility(false);
  }

  return (
    <>
      <h1 className="mainHeader">HANGMAN</h1>
      <button onClick={props.onQuit}>Quit</button>
      <button onClick={restart}>Restart</button>
      <br />
      <br />
      <button onClick={() => setHintVisibility(true)}>Hint</button>
      <br />
      {hintVisibility && `Hint: The theme is ${hint}`}
      <br />
      <img
        className="hangmanImage"
        src={falseLetters.length + 1 + ".png"}
        alt="Hangman"
      />
      <br />
      {[...pair[1]].map((letter) => {
        const visibility = correctLetters.includes(letter)
          ? "visible"
          : "hidden";
        return (
          <span
            className={letter !== " " && "underscored"}
            style={{ visibility }}
          >
            {letter === " " ? "11" : letter}
          </span>
        );
      })}
      <br />
      <br />
      {[...alphabet].map((letter) => {
        const correctLetter = correctLetters.includes(letter);
        const falseLetter = falseLetters.includes(letter);
        const backgroundColor = correctLetter
          ? "green"
          : falseLetter
          ? "red"
          : "white";
        const color = correctLetter || falseLetter ? "white" : "black";
        return (
          <button
            className="keyboard"
            onClick={status === "play" ? () => handleLetter(letter) : null}
            style={{ backgroundColor, color }}
          >
            {letter}
          </button>
        );
      })}
      <br />
      <div
        className="end"
        style={{ color: status === "win" ? "green" : "red" }}
      >
        {status === "win" ? "You Win!" : status === "lose" && "You Lose!"}
      </div>
      <br />
      {status === "lose" && `The correct answer is ${pair[1]}`}
      <div>
        {status !== "play" && (
          <>
            <b>History of Completed Words</b>
            <div className="historyList">
              <ol>
                {completedWords.map(([word, status]) => (
                  <li
                    className="element"
                    style={{ color: status === "win" ? "green" : "red" }}
                  >
                    {word}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
      <br />
    </>
  );
}

export default function App() {
  const [start, setStart] = useState(false);
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);

  return (
    <div className="App">
      {start ? (
        <Game
          onQuit={() => setStart(false)}
          onWin={() => setWin(win + 1)}
          onLose={() => setLose(lose + 1)}
        />
      ) : (
        <Start win={win} lose={lose} onClick={() => setStart(true)} />
      )}
      <Guide />
    </div>
  );
}
