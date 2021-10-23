// Modules
// const { json } = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to database (.txt file)
const filePath = path.join(path.dirname(require.main.filename), 'database', 'books.text');

module.exports = class Book {
    constructor(data){
        const { title, author, year } = data;
        this.title = title;
        this.author = author;
        this.year = year;
        this.guid = uuid.v4();
    }

    // Getting generated user (book) random ID
    getGuid(){
        return this.guid;
    }

    // Saving the new book in books array
    save(){
        // The file must be read every time it's modified
        fs.readFile(filePath, (err, data) => {
            let books = [];
            if(!err){
                books = JSON.parse(data);
            }
            books.push(this);
            fs.writeFile(filePath, JSON.stringify(books), err => console.log(err));
        })
    }

    // Updating the data (books) with the new one
    static update(books){
        fs.writeFile(filePath, JSON.stringify(books), err => console.log(err));
    }

    // Get and parse the data (async)
    static getAll(cb){
        fs.readFile(filePath, (err, data) => {
            let books = [];
            if(!err){
                books = JSON.parse(data);
            }

            cb(books);
        });
    }
};