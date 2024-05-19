const express = require('express')
const app = express()

const cors = require('cors');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cors({
    origin:["taksmanage.netlify.app"],
    credentials:true
}));

////////// routes///
const user_routes = require('./routes/user.routes');
const task_routes = require('./routes/task.routes');

app.use('/api/v2',user_routes);
app.use('/api/v2',task_routes);

app.use(errorMiddleware);


module.exports = app