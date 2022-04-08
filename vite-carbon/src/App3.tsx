import React, { useRef } from "react";
import "./App.scss";
import AppUI from "./AppUI";
import { IConfigUIModel, initConfigModel } from "./state/ConfigState3";

const App: React.FC<Record<string, never>> = () => {
  const stateRef = useRef<IConfigUIModel>(initConfigModel());
  return <AppUI state={stateRef.current} />;
};

export default App;
