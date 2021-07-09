import { Button, TextInput } from "carbon-components-react";
import { observer } from "mobx-react";
import { applySnapshot, getSnapshot } from "mobx-state-tree";
import React, { ChangeEvent, useState } from "react";
import "./App.scss";
import { ConfigModel } from "./state/ConfigState";

function App() {
  // Create the mobx state here. Can then be distributed via props, or React context.
  const [configState] = useState(ConfigModel.create());
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

  const formFields = (
    <>
      <TextInput
        className="mx--text-input"
        id="min input"
        labelText="Minimum instances"
        value={configState.minInstances}
        invalid={!!configState.minInstancesError}
        invalidText={configState.minInstancesError}
        onChange={changeHandler(configState.setMinInstances)}
        placeholder="Type some text"
      />
      <TextInput
        className="mx--text-input"
        id="max input"
        labelText="Maximum instances"
        value={configState.maxInstances}
        invalid={!!configState.maxInstancesError}
        invalidText={configState.maxInstancesError}
        onChange={changeHandler(configState.setMaxInstances)}
        placeholder="Type some text"
      />
      <TextInput
        className="mx--text-input"
        id="port input"
        labelText="Container port"
        value={configState.port}
        invalid={!!configState.portError}
        invalidText={configState.portError}
        onChange={changeHandler(configState.setPort)}
        placeholder="Type some text"
      />
    </>
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
  const canSave: boolean = isDirty && configState.isValid;

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
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h3>Mobx state tree sample app</h3>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-12">
            <h4>Input fields</h4>
            {formFields}
          </div>
          <div className="bx--col-lg-4">
            <h4>Actions</h4>
            {buttons}
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(App);
