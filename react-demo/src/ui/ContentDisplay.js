import React from 'react';
import { observer } from 'mobx-react-lite';
import { authorsView, booksView, categoriesView } from '../state/UIState';


const AuthorsDisplay = observer(({ stateStore }) => {
  const uiState = stateStore.uiState;
  const authorId = uiState.selectedItem.id;
  const author = stateStore.content.getAuthorById(authorId);
  const edit = () => uiState.modifyItem(authorId, uiState.selectedView);
  
  return (
    <div>
      <h4>Author: {author.firstName} {author.lastName}</h4>
      <span className="edit-button" onClick={edit} >Edit</span>
    </div>
  );
});

const CategoriesDisplay = observer(({ stateStore }) => {
  const uiState = stateStore.uiState;
  const categoryId = uiState.selectedItem.id;
  const category = stateStore.content.getCategoryById(categoryId);
  const edit = () => uiState.modifyItem(categoryId, uiState.selectedView);
  
  return (
    <div>
      <h4>Category: {category.name}</h4>
      <span className="edit-button" onClick={edit} >Edit</span>
    </div>
  );
});

const BooksDisplay = observer(({ stateStore }) => {
  const uiState = stateStore.uiState;
  const bookId = uiState.selectedItem.id;
  const content = stateStore.content;
  const book = content.getBookById(bookId);
  const author = content.getAuthorById(book.authorId);
  console.log(book.authorId);
  console.log(JSON.stringify(author));
  const authorDisplay = (author && `${author.firstName} ${author.lastName}`) || 'unknown author';
  const category = content.getCategoryById(book.categoryId);
  const categoryDisplay = (category && category.name) || 'not categorized';


  const edit = () => uiState.modifyItem(bookId, uiState.selectedView);
  
  return (
    <div>
      <h2>{book.title}</h2>
      <h3>By <em>{authorDisplay}</em></h3>
      <h3>Category: <em>{categoryDisplay}</em></h3>
      <span className="edit-button" onClick={edit} >Edit</span>
    </div>
  );
});

const ContentDisplay = observer(({ stateStore }) => {
  const selectedItem = stateStore.uiState.selectedItem;
  console.log(JSON.stringify(selectedItem));
  if (selectedItem.id === '') {
    return <div><h4>Nothing to display</h4></div>
  }
  const view = selectedItem.type;
  let display;
  switch (view) {
    case authorsView:
      display = <AuthorsDisplay stateStore={stateStore} />;
      break;
    case categoriesView:
      display = <CategoriesDisplay stateStore={stateStore} />;
      break;
    case booksView:
      display = <BooksDisplay stateStore={stateStore} />;
      break;
    default:
      display = <h3>WTF?</h3>
  }
  return display;
});

export default ContentDisplay;
