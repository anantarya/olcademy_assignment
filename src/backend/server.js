const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const connectDatabase = require('./utils/db')
const bodyparser = require("body-parser");




dotenv.config();
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));




app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});



