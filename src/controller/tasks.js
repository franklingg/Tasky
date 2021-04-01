const Task = require('@model/Task');

TaskController = {
    getTasks(req,res) {
        Task.find().then(tasks=>{
            res.status(200).json(tasks);
        })
        .catch(err=>{
            console.log("Ocorreu um erro: " + err);
            res.status(401).json("Ocorreu um erro: " + err);
        })
    },

    getTasksSort(req,res) {
        Task.find().sort({highPriority:-1,name:1}).then(tasks=>{
            res.status(200).json(tasks);
        })
        .catch(err=>{
            console.log("Ocorreu um erro: " + err);
            res.status(401).json("Ocorreu um erro: " + err);
        })
    },

    updateTask(req,res) {
        Task.findByIdAndUpdate(req.params.id, req.body).then(doc=>{
            console.log("Task atualizada: " + doc);
            res.status(200).json("Task atualizada: " + doc);
        })
        .catch(err=>{
            console.log("Ocorreu um erro: " + err);
            res.status(400).json("Ocorreu um erro: " + err);
        })
    },


    createTask(req,res) {
        const task = new Task(req.body);
        task.save((err,doc)=>{
            if (err){
                res.status(400).json("EROOOOOOO!!"+err);
            } else {
                res.status(201).json("Task criada com sucesso: "+doc);
            }
        })
    },

    removeTask(req,res) {
        Task.findByIdAndRemove(req.params.id).then(success=>{
            if(!success){
                console.log("Tarefa não existe");
                res.status(400).json("Tarefa não existe");
            } 
            console.log("Task removida com sucesso");
            res.status(204);
        })
    }
}

module.exports=TaskController;