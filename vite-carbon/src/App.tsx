import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Button, TextInput } from "carbon-components-react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
  };
  return (
    <div className="App">
      <header></header>
      <body>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col">
              <h3>Mobx state tree sample app</h3>
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-12">
              <h4>The form fields go here</h4>
            </div>
            <div className="bx--col-lg-4">
              <h4>The buttons go here</h4>
            </div>
          </div>
        </div>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <Button role="primary" onClick={() => setCount(count + 1)}>
          Test Carbon
        </Button>
        <TextInput
          id="test input"
          labelText="Input field"
          invalid={false}
          invalidText=""
          onChange={onChangeHandler}
          placeholder="Types some text"
        />
      </body>
    </div>
  );
}

export default App;
