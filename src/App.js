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
  const [currentTheme, setCurrentTheme] = React.useState("");
  const [themeCounter, setThemeCounter] = React.useState(0);

  React.useEffect(() => {
    if (themeCounter % 3 === 0) {
      setCurrentTheme("");
    } else if (themeCounter % 3 === 1) {
      setCurrentTheme("light");
    } else {
      setCurrentTheme("neon");
    }
  }, [themeCounter]);

  function changeTheme() {
    setThemeCounter((prevCounter) => prevCounter + 1);
  }

  function updateText(text) {
    setCurrentText((prevText) => {
      if (text.toString().match("[-/+*]")) {
        if (
          answer &&
          answer !== "Syntax Error" &&
          answer !== "Division by zero" &&
          currentText.length === 0
        ) {
          if (text.match("[-/+*]")) {
            return `${answer} ${text} `;
          }
        }
        return prevText + " " + text + " ";
      } else return prevText + text;
    });
  }

  function deleteText() {
    setCurrentText((prevText) => {
      if (prevText[prevText.length - 2] === " ") {
        return prevText.slice(0, prevText.length - 2);
      } else return prevText.slice(0, prevText.length - 1);
    });
  }

  function evaluateExpression() {
    const result = calculateString(currentText).toString();
    // The statements within the if statement below just trim any unnecessary zeroes
    // that the user may have entered from the output
    if (result.startsWith("0") && result.length > 1) {
      let trimmedResults = "";
      let trimmed = false;
      for (let i = 0; i < result.length; i++) {
        if (trimmed) {
          trimmedResults += result[i];
        } else {
          if (result[i] === "0") {
            continue;
          } else {
            trimmedResults += result[i];
            trimmed = true;
          }
        }
      }
      setAnswer(trimmedResults);
      setCurrentText("");
    } else {
      setAnswer(result);
      setCurrentText("");
    }
  }

  function reset() {
    setAnswer("");
    setCurrentText("");
  }

  return (
    <div className={`view-area ${currentTheme}`}>
      <div className={`calc-container`}>
        <div className="calc-header">
          <div className="calc-name">calc</div>
          <div className="calc-theme-container">
            <div className="calc-theme-text">Theme</div>
            <div
              className={`calc-theme-switcher ${currentTheme}`}
              onClick={changeTheme}
            >
              <div className={`calc-theme-toggler ${currentTheme}`}></div>
            </div>
          </div>
        </div>
        <div className={`calc-display ${currentTheme}`}>
          <div className={`calc-display-text`}>{currentText}</div>
          {answer && (
            <div
              className={
                (answer === "Syntax Error" || answer === "Division by zero") &&
                answer !== 0
                  ? "calc-answer error"
                  : "calc-answer"
              }
            >
              {answer}
            </div>
          )}
        </div>
        <div className={`calc-buttons ${currentTheme}`}>
          <Button
            class={`num ${currentTheme}`}
            value={7}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={8}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={9}
            updateText={updateText}
          />
          <Button
            class={`num del ${currentTheme}`}
            value={"Del"}
            updateText={deleteText}
          />

          <Button
            class={`num ${currentTheme}`}
            value={4}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={5}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={6}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={"+"}
            updateText={updateText}
          />

          <Button
            class={`num ${currentTheme}`}
            value={1}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={2}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={3}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={"-"}
            updateText={updateText}
          />

          <Button
            class={`num ${currentTheme}`}
            value={"."}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={0}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={"*"}
            updateText={updateText}
          />
          <Button
            class={`num ${currentTheme}`}
            value={"/"}
            updateText={updateText}
          />

          <Reset
            class={`num reset ${currentTheme}`}
            value={"Reset"}
            reset={reset}
          />
          <Equal
            class={`num equals ${currentTheme}`}
            value={"="}
            evaluateExpression={evaluateExpression}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
