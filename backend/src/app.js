const express = require("express");
// Escritura ES5;
const app = express();
const cors = require("cors");
// Settings, si el lugar donde lo despleguemos (geroku), será 
app.set('port',process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json()); 

// routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

module.exports = app;
