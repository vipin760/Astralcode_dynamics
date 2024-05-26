const { createTask, getTask, singleTaskFetch, singleTaskUpdate, taskDeleted, searchkeyword, togglePriority } = require("../controller/task.controller");
const express = require('express');
const { authorization } = require("../middleware/auth");
const router = express()

router.route('/task/create').post(authorization,createTask)

router.route('/task').get(authorization,getTask)

router.route('/task/:id').get(authorization,singleTaskFetch).put(authorization,singleTaskUpdate).delete(authorization,taskDeleted).patch(togglePriority);


module.exports = router