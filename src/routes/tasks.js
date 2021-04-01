const router = require('express').Router();
const TaskController = require('@controller/tasks');
const {authorizeUser} = require('@middlewares/Auth');

router.post('/add',TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/sort', TaskController.getTasksSort);
router.put('/update/:id', TaskController.updateTask);
router.delete('/remove/:id', TaskController.updateTask);

module.exports = router;