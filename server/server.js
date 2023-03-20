const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// location of created bundle
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require route and send app in
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));