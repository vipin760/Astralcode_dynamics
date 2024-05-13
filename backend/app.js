const express = require('express')
const app = express()

const cors = require('cors');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cors());

////////// routes///
const user_routes = require('./routes/user.routes');

app.use('/api/v2',user_routes);

app.use(errorMiddleware);


module.exports = app