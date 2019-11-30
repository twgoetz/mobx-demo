import { types } from 'mobx-state-tree';
import { toJS } from 'mobx';

import Content, { initialContent } from './Content';
import UIState, { initialUIState } from './UIState';

const StateStore = types
  .model({
    content: Content,
    uiState: UIState,
  })
  .actions(self => ({
    import: (json) => {
      self.content = json.content;
      self.uiState = json.uiState;
    },
  }))
  .views(self => ({
    export: () => toJS(self),
  }));

const initialState = () => (
  StateStore.create({
    content: initialContent(),
    uiState: initialUIState(),
  })
);

export { initialState };
