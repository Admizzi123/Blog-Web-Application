const ejs = require('ejs-locals');

// Set the directory where your EJS files are located
const ejsDir = './views';

// Set the directory where you want to output the rendered HTML files
const outputDir = './_site';

// Render EJS files
ejs(ejsDir, outputDir);