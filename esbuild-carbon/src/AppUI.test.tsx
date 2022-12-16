import React, {createElement} from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppUI from "./AppUI";
import { initConfigModel } from './state/ConfigState';

describe('UI test', () => {
  it('should enable the save button when a value has changed', async () => {
    const state = initConfigModel();
    render(<AppUI state={state} />);
    const saveButton = await waitFor(() => screen.findByTestId('save-button'));
    expect(saveButton).toBeDisabled();
    state.content.setMaxInstances('5');
    await waitFor(() => !saveButton.hasAttribute('disabled'));
    // expect(saveButton.hasAttribute('disabled')).toBeFalsy();
    state.content.setMaxInstances('-1');
    await waitFor(() => saveButton.hasAttribute('disabled'));
    await waitFor(() => !saveButton.hasAttribute('disabled'));
  });
});
