import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import TextInputControl from './TextInputControl';
import { authorsView, booksView, categoriesView } from '../state/UIState';

const CategoryEdit = observer(({ stateStore }) => {
  const categoryId = stateStore.uiState.editItem.id;
  const category = stateStore.content.getCategoryById(categoryId);
  const [catName, setCatName] = useState(category ? category.name : '');
  const [id, setId] = useState(category ? category.id : '');
  if (category && id !== categoryId) {
    setCatName(category.name);
  }
  if (id !== categoryId) {
    setId(categoryId);
    if (categoryId === '') {
      setCatName('');
    }
  }

  const submit = () => {
    if (category) {
      stateStore.content.updateCategory(id, catName);
    } else {
      stateStore.content.newCategory(catName);
    }
    setCatName('');
  }

  const header = (category && 'Modify category name') || 'Create new category';

  return (
    <>
      <h4>{header}</h4>
      <TextInputControl id={id} label="Category name" value={catName} setText={setCatName} />
      <div className="edit-button" onClick={submit} >Submit</div>
    </>
  );
});

const BookEdit = observer(({ stateStore }) => {
  const bookId = stateStore.uiState.editItem.id;
  const book = stateStore.content.getBookById(bookId);
  const [title, setTitle] = useState(book ? book.title : '');
  const [category, setCategory] = useState(book ? book.categoryId : '');
  const [author, setAuthor] = useState(book ? book.authorId : '');
  const [id, setId] = useState(bookId);
  if (book && id !== bookId) {
    setTitle(book.title);
    setCategory(book.categoryId);
    setAuthor(book.authorId);
  }
  if (id !== bookId) {
    setId(bookId);
    if (bookId === '') {
      setTitle('');
      setAuthor('');
      setCategory('');
    }
  }

  const submit = () => {
    if (book) {
      stateStore.content.updateBook(id, author, title, category);
    } else {
      stateStore.content.newBook(author, title, category);
    }
  }

  const header = (book && 'Modify book info') || 'Create new book';

  const selectCategory = (e) => setCategory(e.target.value);
  const selectAuthor = (e) => setAuthor(e.target.value);

  return (
    <>
      <h4>{header}</h4>
      <TextInputControl id={id} label="Title" value={title} setText={setTitle} />
      <div>
        <select onChange={selectAuthor} value={author} >
          <option value=''>Unknown author</option>
          {stateStore.content.authors.map(auth => (
            <option value={auth.id} key={uuid()} >{auth.firstName} {auth.lastName}</option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={selectCategory} value={category} >
          <option value=''>Not categorized</option>
          {stateStore.content.categories.map(cat => (
            <option value={cat.id} key={uuid()} >{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="edit-button" onClick={submit} >Submit</div>
    </>
  );
});

const AuthorEdit = observer(({ stateStore }) => {
  const authorId = stateStore.uiState.editItem.id;

  const contentStore = stateStore.content;
  const author = contentStore.getAuthorById(authorId);
  const [firstName, setFirstName] = useState(author ? author.firstName : '');
  const [lastName, setLastName] = useState(author ? author.lastName : '');
  const [id, setId] = useState(author ? author.id : '');
  if (author && id !== authorId) {
    setFirstName(author.firstName);
    setLastName(author.lastName);
  }
  if (id !== authorId) {
    setId(authorId);
    if (authorId === '') {
      setFirstName('');
      setLastName('');
    }
  }

  const submit = () => {
    if (author) {
      contentStore.updateAuthor(authorId, firstName, lastName);
    } else {
      contentStore.newAuthor(firstName, lastName);
    }
  }

  const header = (author && 'Modify author info') || 'Create new author'

  return (
    <>
      <h4>{header}</h4>
      <TextInputControl id={id} label="First name" value={firstName} setText={setFirstName} />
      <TextInputControl id={id} label="Last name" value={lastName} setText={setLastName} />
      <div className="edit-button" onClick={submit} >Submit</div>
    </>
  );
});

const ContentEdit = observer(({ stateStore }) => {
  const editType = stateStore.uiState.editItem.type;

  let editor;
  switch (editType) {
    case authorsView:
      editor = <AuthorEdit stateStore={stateStore} />
      break;
    case categoriesView:
      editor = <CategoryEdit stateStore={stateStore} />
      break;
    case booksView:
      editor = <BookEdit stateStore={stateStore} />
      break;
    default:
      editor = <h3>Nothing to edit</h3>;
  }

  return (
    <>{editor}</>
  );
});

export default ContentEdit;
