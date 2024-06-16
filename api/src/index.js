const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./config/db');
const route = require('./routes');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))

//Custom Middleware
app.use(SortMiddleware);

// Connect to DB
db.connect();

// Router init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})