import React from 'react';
import { observer } from 'mobx-react-lite';
import SVG from 'react-inlinesvg';
import { booksView, authorsView, categoriesView } from '../state/UIState';
import authorIcon from '../icons/user-plus.svg';
import bookIcon from '../icons/book.svg';
import categoryIcon from '../icons/folder-plus.svg'

const buttonLabels = {
  [booksView]: 'Books',
  [authorsView]: 'Authors',
  [categoriesView]: 'Categories'
};

const addIcons = {
  [booksView]: bookIcon,
  [authorsView]: authorIcon,
  [categoriesView]: categoryIcon,
}

const AddIcon = observer(({ stateStore }) => {
  const uiState = stateStore.uiState;
  const submit = () => uiState.addNew();
  return (
    <SVG
      src={addIcons[uiState.selectedView]}
      onClick={submit}
    />
  );
});

const Button = observer(({ viewType, stateStore }) => {
  let className = 'nav-tabs-button';
  if (viewType === stateStore.uiState.selectedView) {
    className = `${className} selected`;
  }
  
  const submit = () => {
    stateStore.uiState.selectView(viewType);
  }

  return (
    <div className={className} onClick={submit} >{buttonLabels[viewType]}</div>
  );
});

const NavTabs = ({ stateStore }) => {

  return (
    <div className="nav-tabs">
      <Button viewType={booksView} stateStore={stateStore} />
      <Button viewType={authorsView} stateStore={stateStore} />
      <Button viewType={categoriesView} stateStore={stateStore} />
      <AddIcon stateStore={stateStore} />
    </div>
  );
}

export default NavTabs;
