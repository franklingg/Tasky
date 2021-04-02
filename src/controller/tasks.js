const Task = require('@model/Task');

TaskController = {
    getTasks(req,res) {
        Task.find({userId: req.id}).then(tasks=>{
            return res.status(200).json(tasks);
        })
        .catch(err=>{
            return res.status(401).json("Ocorreu um erro: " + err);
        })
    },

    getTasksSort(req,res) {
        Task.find({userId: req.id}).sort({highPriority:-1,name:1}).then(tasks=>{
            return res.status(200).json(tasks);
        })
        .catch(err=>{
            return res.status(401).json("Ocorreu um erro: " + err);
        })
    },

    updateTask(req,res) {
        Task.findByIdAndUpdate(req.params.id, req.body).then(doc=>{
            return res.status(200).json("Task atualizada: " + doc);
        })
        .catch(err=>{
            return res.status(400).json("Ocorreu um erro: " + err);
        })
    },


    createTask(req,res) {
        const task = new Task(req.body);
        task.userId = req.id;
        task.save((err,doc)=>{
            if (err){
                return res.status(400).json("EROOOOOOO!!"+err);
            } else {
                return res.status(201).json("Task criada com sucesso: "+doc);
            }
        })
    },

    removeTask(req,res) {
        Task.findByIdAndRemove(req.params.id, req.body).then(success=>{
            if(!success){
                return res.status(400).json("Tarefa não existe");
            }
            return res.status(204);
        })
    }
}

module.exports=TaskController;