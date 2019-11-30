import { types } from 'mobx-state-tree';
import { v4 as uuid } from 'uuid';

// Model for an author
const Author = types
  .model({
    firstName: types.string,
    lastName: types.string,
    id: types.string,
  });

// Model for a single book
const Book = types
  .model({
    authorId: types.string,
    title: types.string,
    categoryId: types.string,
    id: types.string,
  });

// Model a category
const Category = types
  .model({
    name: types.string,
    id: types.string,
  })

// The Content consists of a list of authors, a list of books, and a list of categories
const Content = types
  .model({
    authors: types.array(Author),
    books: types.array(Book),
    categories: types.array(Category),
  })
  .actions(self => ({
    // Create a new book and add it to the list
    newBook: (authorId, title, categoryId) => {
      const book = {
        authorId,
        title,
        categoryId,
        id: uuid(),
      };
      self.books = [...self.books, book];
    },
    // Create a new author and add it to the list
    newAuthor: (firstName, lastName) => {
      const author = {
        firstName,
        lastName,
        id: uuid(),
      }
      self.authors = [...self.authors, author];
    },
    // Add a new category to the list
    newCategory: name => {
      const category = { 
        name, 
        id: uuid(),
      };
      self.categories = [...self.categories, category];
    },
    updateAuthor: (id, firstName, lastName) => {
      // Get a copy of the authors list
      const authors = self.authors;
      const authorIndex = authors.findIndex(author => author.id === id);
      // Modify the copy
      authors[authorIndex].firstName = firstName;
      authors[authorIndex].lastName = lastName;
      // Assign the modified copy back to the store
      self.authors = authors;
    },
    updateCategory: (id, name) => {
      const categories = self.categories;
      const idx = categories.find(cat => cat.id === id);
      categories[idx].name = name;
      self.categories = categories;
    },
    updateBook: (id, authorId, title, categoryId) => {
      const books = self.books;
      const idx = books.findIndex(book => book.id === id);
      books[idx].authorId = authorId;
      books[idx].title = title;
      books[idx].categoryId = categoryId;
      self.books = books;
    },
  }))
  .views(self => ({
    // Returns the author if it exists, undefined else
    getAuthorById: (authorId) => {
      return self.authors.find(author => author.id === authorId);
    },
    getCategoryById: (categoryId) => {
      return self.categories.find(cat => cat.id === categoryId);
    },
    getBookById: (id) => {
      return self.books.find(book => book.id === id);
    },
    getBooksByAuthor: (authorId) => {
      return self.books.filter((book) => book.authorId === authorId);
    },
  }));

const initialContent = () => (
  Content.create({
    authors: [],
    books: [],
    categories: [],
  })
);

export default Content;
export { initialContent };
