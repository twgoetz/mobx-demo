import React from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { authorsView, booksView, categoriesView } from '../state/UIState';

const NavView = observer(({ stateStore }) => {
  const uiState = stateStore.uiState;
  const selectItem = (id) => uiState.selectItem(id, uiState.selectedView);
  const selectBook = (id) => uiState.selectItem(id, booksView);
  const bookSelectHandler = (id) => (event) => {
    event.stopPropagation();
    uiState.selectItem(id, booksView);
    return false;
  }

  let view;
  switch (uiState.selectedView) {
    case authorsView:
      view = <div className="nav-items">
        <ul>
          {
            stateStore.content.authors.map(author => {
              const books = stateStore.content.getBooksByAuthor(author.id);
              const booksList = books
                .map((book) => <li key={uuid()} onClick={bookSelectHandler(book.id)} >{book.title}</li>);
              return <li key={uuid()} onClick={() => selectItem(author.id)} ><b>{`${author.firstName} ${author.lastName}`}</b>
                <ul>
                  {booksList}
                </ul>
              </li>;
            })
          }
        </ul>
      </div>;
          break;
        case categoriesView:
      view = <div className="nav-items">
            <ul>
              {
                stateStore.content.categories.map(cat => (
                  <li key={uuid()} onClick={() => selectItem(cat.id)} >{cat.name}</li>
                ))
              }
            </ul>
          </div>;
          break;
        case booksView:
      view = <div className="nav-items">
            <ul>
              {
                stateStore.content.books.map(book => (
                  <li key={uuid()} onClick={() => selectItem(book.id)} >{book.title}</li>
                ))
              }
            </ul>
          </div>;
          break;
          default:
      view = <div></div>;
      }
      return view;
    });
    
    export default NavView;
