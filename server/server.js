// first we'll need to review our package json files including our full file folder package json, where initial command executions will be run.
// ensure we are running concurrent in our start development mode and add this to our devDependency label.  also add nodemon to devDep, these will ensure we are running and ignoring the client folder to work with the files we create for desired functionality directly
// start production mode will build a distribution folder in our client to readwrite the files we created for styling or interactivity, then connect it to our html template.
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// location of created bundle - files needed for desired effects after build
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require route file pass app in
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));