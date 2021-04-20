const router = require('express').Router();
const TaskController = require('@controller/tasks');
const { authorizeUser } = require('@middlewares/Auth');

router.get('/', authorizeUser, TaskController.getTasks);
router.get('/sort', authorizeUser, TaskController.getTasksSort);
router.post('/add', authorizeUser, TaskController.createTask);
router.put('/update/:id', authorizeUser, TaskController.updateTask);
router.delete('/remove/:id', authorizeUser, TaskController.removeTask);

module.exports = router;