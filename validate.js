// Import AJV
const Ajv = require("ajv");

// Import the schema and fighter data
const schema = require("./schema.json");
const fighter = require("./fighter.json");

// Initialize AJV
const ajv = new Ajv();  // You can also pass options like {allErrors: true} to get all errors
const validate = ajv.compile(schema); // Compile the schema

// Validate the fighter data
if (validate(fighter)) {
    console.log("Fighter is valid!");
} else {
    console.error("Validation errors:", validate.errors);
}