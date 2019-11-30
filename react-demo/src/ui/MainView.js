import React from 'react';
import { saveAs } from 'file-saver';

import ContentEdit from './ContentEdit';
import NavTabs from './NavTabs';
import NavView from './NavView';
import ContentDisplay from './ContentDisplay';

const SaveButton = ({ stateStore }) => {
  const save = () => {
    const jsonState = stateStore.export();
    const blob = new Blob([JSON.stringify(jsonState)], { type: "application/json" });
    saveAs(blob);
  }
  return (
    <span className="io-button" onClick={save}>Save</span>
  );
}

const LoadButton = ({ stateStore }) => {
  let inputRef;

  const load = (e, files) => {
    const file = files || e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContents = fileReader.result;
      console.log(fileContents);
      const library = JSON.parse(fileContents);
      stateStore.import(library);
    };
    fileReader.readAsText(file, 'UTF-8');
  };

  const input = <input
    ref={(input) => { inputRef = input; }}
    type="file"
    hidden
    id="uploadButton"
    onClick={() => { inputRef.value = null; }} // So we can upload the same file twice in a row
    onChange={load} />;

  const clickInput = () => {
    console.log('Load clicked');
    inputRef.click();
  }

  return (
    <div className="io-button" onClick={clickInput} >
      Load
      {input}
    </div>
  );
}

const MainView = ({ stateStore }) => {

  return (
    <>
      <div className="main-view">
        <div className="nav-bar">
          <NavTabs stateStore={stateStore} />
          <NavView stateStore={stateStore} />
        </div>
        <div className="content-view">
          <div className="content-display">
            <ContentDisplay stateStore={stateStore} />
          </div>
          <div className="content-edit">
            <ContentEdit stateStore={stateStore} />
          </div>
        </div>
      </div>
      <div className="io-buttons">
        <SaveButton stateStore={stateStore} />
        <LoadButton stateStore={stateStore} />
      </div>
    </>
  );
};

export default MainView;
