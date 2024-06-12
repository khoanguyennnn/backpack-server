const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const db = require('./config/db');
const route = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to DB
db.connect();

// Router init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})