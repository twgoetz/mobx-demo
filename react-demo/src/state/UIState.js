import { types } from 'mobx-state-tree';

const booksView = 'booksView';
const authorsView = 'authorsView';
const categoriesView = 'categoriesView';

const viewsList = [booksView, authorsView, categoriesView];

const Selected = types
  .model({
    // Can be book or author
    type: types.string,
    id: types.string,
  });

const UIState = types
  .model({
    selectedView: types.string,
    selectedItem: types.optional(Selected, { type: '', id: '' }),
    editItem: types.optional(Selected, { type: '', id: '' }),
  })
  .actions(self => ({
    
    selectView: view => {
      self.selectedItem = { type: '', id: '' };
      self.editItem = { type: view, id: '' };
      self.selectedView = view
    },

    selectItem: (id, type) => {
      self.selectedItem = { id, type };
    },

    modifyItem: (id, type) => {
      self.editItem = { id, type };
    },

    addNew: () => {
      console.log(`Old: ${self.editItem.type}, new: ${self.selectedView}`);
      self.editItem = { type: self.selectedView, id: '' };
    },

  }));

const initialUIState = () => (
  UIState.create({
    selectedView: viewsList[1],
    editItem: { type: '', id: '' },
  })
);

export default UIState;
export { booksView, authorsView, categoriesView, viewsList };
export { initialUIState };
