import { Button, TextInput, Tile } from "@carbon/react";
import { observer } from "mobx-react";
import React, { ChangeEvent, useRef } from "react";
import "./App.scss";
import { IConfigContentModel, initConfigContentModel } from "./state/ConfigState1";

const App: React.FC<Record<string, never>> = observer(() => {

  const stateRef = useRef<IConfigContentModel>(initConfigContentModel());
  const state = stateRef.current;

  // Promote a string setter to an input change handler
  const changeHandler = (
    handler: (value: string) => void
  ): ((event: ChangeEvent<HTMLInputElement>) => void) => {
    return (event) => {
      handler(event.target.value);
    };
  };

  const formFields = (
    <Tile>
      <h4>Input fields</h4>
      <TextInput
        className="mx--text-input"
        id="min input"
        labelText="Minimum instances"
        value={state.minInstances}
        invalid={false}
        invalidText=''
        onChange={changeHandler(state.setMinInstances)}
        placeholder="Type some text"
        light={true}
      />
      <TextInput
        className="mx--text-input"
        id="max input"
        labelText="Maximum instances"
        value={state.maxInstances}
        invalid={false}
        invalidText=''
        onChange={changeHandler(state.setMaxInstances)}
        placeholder="Type some text"
        light={true}
      />
      <TextInput
        className="mx--text-input"
        id="port input"
        labelText="Container port"
        value={state.port}
        invalid={false}
        invalidText=''
        onChange={changeHandler(state.setPort)}
        placeholder="Type some text"
        light={true}
      />
    </Tile>
  );

  // On save, we cancel the dirty state and save a snapshot of the model
  const onSave = (): void => {
  };

  // On cancel, reset the dirty state and load the snapshot that was saved earlier (or the empty state)
  const onCancel = (): void => {
  };

  const canSave: boolean = true;
  const isDirty: boolean = true;

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
})

export default App;
