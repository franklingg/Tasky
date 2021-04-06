const Task = require('@model/Task');

TaskController = {
    getTasks(req,res) {
        Task.find({userId: req.id}).then(tasks=>{
            return res.status(200).json(tasks);
        })
        .catch(err=>{
            return res.status(400).send({ error: 'Tarefas não encontradas' });
        })
    },

    getTasksSort(req,res) {
        Task.find({userId: req.id}).sort({highPriority:-1,name:1}).then(tasks=>{
            return res.status(200).json(tasks);
        })
        .catch(err=>{
            return res.status(400).send({ error: 'Tarefas não encontradas' });
        })
    },

    async updateTask(req,res) {
        try{
            const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true});
            return res.status(200).json(task);
        } catch(err){
            return res.status(400).send({error: "Tarefa não atualizada"});
        }
    },

    createTask(req,res) {
        const task = new Task(req.body);
        task.userId = req.id;
        task.save((err,info)=>{
            if (err)
                return res.status(400).send({error: "Tarefa não criada"});

            return res.status(201).json(info);
        })
    },

    removeTask(req,res) {
        Task.findByIdAndRemove(req.params.id, req.body).then(success=>{
            if(!success){
                return res.status(400);
            }
            return res.status(204);
        })
    }
}

module.exports=TaskController;