import { writable } from 'svelte/store';

const booksView = 'BooksView';
const authorsView = 'AuthorsView';
const categoriesView = 'CategoriesView';

export const selectedView = writable(booksView);

export { booksView, authorsView, categoriesView };
