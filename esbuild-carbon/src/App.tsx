import { Button, TextInput, Tile } from "@carbon/react";
import { observer } from "mobx-react";
import { applySnapshot, getSnapshot } from "mobx-state-tree";
import React, { ChangeEvent, useState } from "react";
import "./App.scss";
import { initConfigModel } from "./state/ConfigState";

function App() {
  // Create the mobx state here. Can then be distributed via props, or React context.
  const [configState] = useState(initConfigModel());
  // Fake a saved instance
  const [lastSave, setLastSave] = useState(getSnapshot(configState));
  // Has the UI state been modified since the last save/cancel?
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Promote a string setter to an input change handler
  const changeHandler = (
    handler: (value: string) => void
  ): ((event: ChangeEvent<HTMLInputElement>) => void) => {
    return (event) => {
      if (!isDirty) {
        setIsDirty(true);
      }
      handler(event.target.value);
    };
  };

  const contentState = configState.content;

  const formFields = (
    <Tile>
      <h4>Input fields</h4>
      <TextInput
        className="mx--text-input"
        id="min input"
        labelText="Minimum instances"
        value={contentState.minInstances}
        invalid={!!configState.minInstancesError}
        invalidText={configState.minInstancesError}
        onChange={changeHandler(contentState.setMinInstances)}
        placeholder="Type some text"
        light={true}
      />
      <TextInput
        className="mx--text-input"
        id="max input"
        labelText="Maximum instances"
        value={contentState.maxInstances}
        invalid={!!configState.maxInstancesError}
        invalidText={configState.maxInstancesError}
        onChange={changeHandler(contentState.setMaxInstances)}
        placeholder="Type some text"
        light={true}
      />
      <TextInput
        className="mx--text-input"
        id="port input"
        labelText="Container port"
        value={contentState.port}
        invalid={!!configState.portError}
        invalidText={configState.portError}
        onChange={changeHandler(contentState.setPort)}
        placeholder="Type some text"
        light={true}
      />
    </Tile>
  );

  // On save, we cancel the dirty state and save a snapshot of the model
  const onSave = (): void => {
    setIsDirty(false);
    const snapshot = getSnapshot(configState);
    setLastSave(snapshot);
    console.log(JSON.stringify(getSnapshot(configState), null, 2));
  };

  // On cancel, reset the dirty state and load the snapshot that was saved earlier (or the empty state)
  const onCancel = (): void => {
    setIsDirty(false);
    applySnapshot(configState, lastSave);
    console.log(JSON.stringify(getSnapshot(configState), null, 2));
  };

  // Note: no separate useState required
  const canSave: boolean = isDirty && configState.canSave;

  const buttons = (
    <>
      <Button
        className="mx--button"
        role="primary"
        disabled={!canSave}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        className="mx--button"
        role="primary"
        disabled={!isDirty}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </>
  );

  return (
    <>
      <h3 className="mx--main-heading">Mobx state tree sample app</h3>
      {formFields}
      <div className="mx--button-container">
        <h4 className="$heading-04">Actions</h4>
        {buttons}
      </div>
    </>
  );
}

export default observer(App);
