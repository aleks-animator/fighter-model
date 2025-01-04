// Import AJV
const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");

// Initialize AJV with allErrors: true to capture all validation errors
const ajv = new Ajv({ allErrors: true });

// Load the fighter and book schemas directly
const fighterSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas', 'fighter-schema.json')));
const bookSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas', 'book-schema.json')));

// Compile the schemas independently
const validateFighter = ajv.compile(fighterSchema);
const validateBook = ajv.compile(bookSchema);

// Load data files
const fighter = require("./fighter.json");
const book = require("./book.json");

// Validate the fighter data
const validateFighterData = validateFighter(fighter);
if (validateFighterData) {
    console.log("Fighter is valid!");
} else {
    console.error("Fighter validation failed:");
    if (validateFighter.errors) {
        validateFighter.errors.forEach(error => {
            console.error(`- ${error.message} at ${error.dataPath}`);
        });
    }
}

// Validate the book data
const validateBookData = validateBook(book);
if (validateBookData) {
    console.log("Book is valid!");
} else {
    console.error("Book validation failed:");
    if (validateBook.errors) {
        validateBook.errors.forEach(error => {
            console.error(`- ${error.message} at ${error.dataPath}`);
        });
    }
}