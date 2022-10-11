import React from "react";

import "./index.css";

import Button from "./Button";
import Equal from "./Equal";
import Reset from "./Reset";

import calculateString from "./infix-to-postfix";

// TO DO: Write comments explaining the different functions in the app.

function App() {
  const [currentText, setCurrentText] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  function updateText(text) {
    setCurrentText((prevText) => {
      if (text.toString().match("[-/+*]")) {
        return prevText + " " + text + " ";
      } else return prevText + text;
    });
  }

  function deleteText() {
    setCurrentText((prevText) => {
      if (prevText[prevText.length - 2] === " ") {
        return prevText.slice(0, prevText.length - 1);
      } else return prevText.slice(0, prevText.length - 1);
    });
  }

  function evaluateExpression() {
    setAnswer(calculateString(currentText));
  }

  function reset() {
    setAnswer("");
    setCurrentText("");
  }

  return (
    <div className="calc-container">
      <div className="calc-header">
        <div className="calc-name">calc</div>
        <div className="calc-theme-switcher"></div>
      </div>
      <div className="calc-display">
        <div className="calc-display-text">{currentText}</div>
        <div className="calc-answer">{answer}</div>
      </div>
      <div className="calc-buttons">
        <Button class={"num seven"} value={7} updateText={updateText} />
        <Button class={"num eight"} value={8} updateText={updateText} />
        <Button class={"num nine"} value={9} updateText={updateText} />
        <Button class={"num del"} value={"Del"} updateText={deleteText} />

        <Button class={"num four"} value={4} updateText={updateText} />
        <Button class={"num five"} value={5} updateText={updateText} />
        <Button class={"num six"} value={6} updateText={updateText} />
        <Button class={"num add"} value={"+"} updateText={updateText} />

        <Button class={"num one"} value={1} updateText={updateText} />
        <Button class={"num two"} value={2} updateText={updateText} />
        <Button class={"num three"} value={3} updateText={updateText} />
        <Button class={"num subtract"} value={"-"} updateText={updateText} />

        <Button
          class={"num decimal-point"}
          value={"."}
          updateText={updateText}
        />
        <Button class={"num zero"} value={0} updateText={updateText} />
        <Button class={"num multiply"} value={"*"} updateText={updateText} />
        <Button class={"num divide"} value={"/"} updateText={updateText} />

        <Reset class={"num reset"} value={"Reset"} reset={reset} />
        <Equal
          class={"num equals"}
          value={"="}
          evaluateExpression={evaluateExpression}
        />
      </div>
    </div>
  );
}

export default App;
