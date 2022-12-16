import { Button, TextInput, Tile } from "@carbon/react";
import { observer } from "mobx-react";
import React, { ChangeEvent, useEffect, useState } from "react";
// import "./App.scss";
import { IConfigUIModel } from "./state/ConfigState";
import { IConfiguration } from "./types";

const AppUI: React.FC<{ state: IConfigUIModel }> = observer(({ state }) => {
  const [config, setConfig] = useState<IConfiguration>({
    instances: { max: 1, min: 0 },
  });
  const m = state.content;

  useEffect(() => {
    m.import(config);
  }, []);

  // Promote a string setter to an input change handler
  const changeHandler = (
    handler: (value: string) => void
  ): ((event: ChangeEvent<HTMLInputElement>) => void) => {
    return (event) => {
      if (!state.isDirty) {
        state.setIsDirty(true);
      }
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
        value={m.minInstances || ""}
        invalid={!!state.minInstancesError}
        invalidText={state.minInstancesError}
        onChange={changeHandler(m.setMinInstances)}
        placeholder="Type some text"
      />
      <TextInput
        className="mx--text-input"
        id="max input"
        labelText="Maximum instances"
        value={m.maxInstances || ""}
        invalid={!!state.maxInstancesError}
        invalidText={state.maxInstancesError}
        onChange={changeHandler(m.setMaxInstances)}
        placeholder="Type some text"
      />
      <TextInput
        className="mx--text-input"
        id="port input"
        labelText="Container port"
        value={m.port || ""}
        invalid={!!state.portError}
        invalidText={state.portError}
        onChange={changeHandler(m.setPort)}
        placeholder="Type some text"
      />
    </Tile>
  );

  // On save, we cancel the dirty state and save a snapshot of the model
  const onSave = (): void => {
    setConfig(m.export);
    state.setIsDirty(false);
  };

  // On cancel, reset the dirty state and load the snapshot that was saved earlier (or the empty state)
  const onCancel = (): void => {
    m.import(config);
    state.setIsDirty(false);
  };

  const buttons = (
    <>
      <Button
        className="mx--button"
        role="primary"
        disabled={!state.isDirty || !state.canSave}
        onClick={onSave}
        data-testid='save-button'
      >
        Save
      </Button>
      <Button
        className="mx--button"
        role="primary"
        disabled={!state.isDirty}
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
});

export default AppUI;
