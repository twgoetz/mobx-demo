import React from 'react';
import { initialState } from './state/StateStore';
import MainView from './ui/MainView';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.stateStore = initialState();
  };

  render() {
    return (
      <div className="app">
        <h1>MobX state tree demo app</h1>
        <MainView stateStore={this.stateStore} />
      </div>
    );
  }
}

export default App;
