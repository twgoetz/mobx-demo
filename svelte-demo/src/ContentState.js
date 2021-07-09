import { writable } from 'svelte/store';
import uuid from 'uuid/v4';

export const authors = writable([]);
export const categories = writable([]);
export const books = writable([]);

export const newAuthor = (firstName, lastName) => {
    authors.update(old => {
        const author = {
            firstName,
            lastName,
            id: uuid(),
        }
        return [...old, author];
    });
};

export const newCategory = (name) => {
    categories.update(old => {
        const category = {
            name,
            id: uuid(),
        }
        return [...old, category];
    })
}

export const newBook = (authorId, title, year, categoryId) => {
    books.update(old => {
        const book = {
            authorId,
            title,
            year,
            categoryId,
            id: uuid(),
        };
        return [...old, book];
    });
}

export const importAuthors = (list) => {
    authors.update(_ => list);
};

