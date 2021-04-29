const Task = require('@model/Task');

TaskController = {
    async getTasks(req, res) {
        try {
            const tasks = await Task.find({ userId: req.id });
            return res.status(200).send(tasks);
        } catch (err) {
            return res.status(400).send({ error: 'Tarefas não encontradas' });
        }
    },

    async getTasksSort(req, res) {
        try {
            const tasks = await Task.find({ userId: req.id }).sort({ highPriority: -1, name: 1 })
            return res.status(200).send(tasks);
        } catch (err) {
            return res.status(400).send({ error: 'Tarefas não encontradas' });
        }
    },

    async updateTask(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).send({ error: "Tarefa não atualizada" });
        }
    },

    async createTask(req, res) {
        try {
            const task = new Task(req.body);
            task.userId = req.id;
            const response = await task.save();
            return res.status(201).send(response);
        } catch (err) {
            return res.status(400).send({ error: "Tarefa não criada" });
        }
    },

    async removeTask(req, res) {
        try {
            await Task.findByIdAndRemove(req.params.id);
            return res.status(204).send(undefined);
        } catch (err) {
            return res.status(400).send({ error: "Tarefa não encontrada" });
        }
    }
}

module.exports = TaskController;