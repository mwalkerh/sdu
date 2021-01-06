var Glossary = require('glossary-panel');

// JSON file of terms and definitions
var terms = require('./terms');

// Optional configuration objects
//var selectors = { ... };
//var classes = { ... };

new Glossary(terms);
