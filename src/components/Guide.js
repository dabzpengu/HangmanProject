function Guide() {
  return (
    <div className="guide">
      <h1 className="guideHeader">Guide</h1>
      <h4 className="guideHeader">
        Click{" "}
        <a href="https://www.wikihow.com/Play-Hangman" target="_blank">
          here
        </a>{" "}
        to learn the basics of Hangman.{" "}
      </h4>
      <b> Before the game: </b>
      <ul>
        <li>
          You can choose to start the game with a provided list of answers by
          clicking the "Start game" button.
        </li>
        <li>
          You can also choose to add your own answer to the game by following
          the steps below:
          <ol>
            <li>
              In the second space provided, choose the corresponding theme from
              the drop-down menu located on the left. Note that each theme can
              have multiple words.
            </li>
            <li>
              Input your word and click the "Add word" button to add your answer
              to the list of answers.
            </li>
            <li>
              If your theme is not found in the selection, input your theme in
              the first space provided and click the "Add theme" button.
            </li>
            <li>
              Repeat steps 1 - 3 to add multiple themes and words. Once you are
              ready, click "Start game".
            </li>
          </ol>
        </li>
      </ul>
      <b> During the game: </b>
      <ul>
        <li> Click "Restart" to generate a new word. </li>
        <li> Click "Quit" to go back to the homepage. </li>
        <li>
          {" "}
          If you need a hint, click the "Hint" button to reveal the theme of the
          answer.
        </li>
        <li>
          {" "}
          At the end of the game, the webpage will show a history of your past
          completed words. <b style={{ color: "red" }}>Red</b> words are lose
          attempts and <b style={{ color: "green" }}>Green</b> words are won
          attempts.
        </li>
      </ul>
    </div>
  );
}

export default Guide;
