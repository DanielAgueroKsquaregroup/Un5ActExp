// Importing the models
const { Book } = require('../models/index');

// Fetch all books
const getAll = (req, res) => {
    Book.getAll( books => res.send(books) );
};

// Getting book by generated user radom ID
const getByGuid = (req, res) => {
    // Giving the ID we are searching for
    const { guid } = req.params;

    // Reading all books
    Book.getAll( books => {
        // Filtering by guid (generated user random ID)
        const book = books.find( elm => elm.guid === guid);

        if (book) {
            res.send(book);
        } else{
            res.status(404).send({
                message: `There is no book with ID: ${guid}`
            });
        }
    });
};

// Creating book
const createBook = (req, res) => {
    const { body } = req;

    // Creating new instance (POST)
    const newBook = new Book(body);

    // Save in database
    newBook.save();
    res.send({
        message: `Book successfully created!!`,
        guid: newBook.getGuid()
    });
};

// Updating a book
const updateBook = (req, res) => {
    const { params: { guid}, body } = req;

    //Reading Books
    Book.getAll( books => {
        const book = books.find( elm => elm.guid === guid);

        if (book) {
            Object.assign(book, body); // Assigning updated book to the array
            Book.update(books); // Updating array that contain all books, in order to show it
            res.send({
                message: `successfully updated!!`
            });
        } else {
            res.status(404).send({
                message: `There is no user with ID ${guid}`
            });
        }
    })
};

// Deleting a book
const deleteBook = (req, res) => {
    const { guid } = req.params;

    // Reading books
    Book.getAll( (books) => {
        const bookIdx = books.findIndex( elm => elm.guid === guid);

        if (bookIdx !== -1) {
            books.splice(bookIdx, 1);
            Book.update(books);
            res.send({
                message: `Book successfully deleted!!`
            });
        } else {
            res.send({
                message: `There is no user with id: ${guid}`
            });
        }
    });
};

module.exports = {
    getAll,
    getByGuid,
    createBook,
    updateBook,
    deleteBook
};