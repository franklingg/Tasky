import React,{useEffect,useState} from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import './styles.css';

export default function Tasks() {
    
    const [tasks,setTasks] = useState([]);
    const [selectedTask,setSelectedTask] = useState(null);
    const [formValues,setFormValues] = useState({name:"",prioridade:""});

    function handleTaskFocus(event,task) {
        console.log(event.target);
        console.log(task);
    }

    function changeSorting(event) {

    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formValues)
    }

    function handleUpdate(event) {
        const Name=event.target.name;
        const value=event.target.value;
        setFormValues({...formValues,[Name]:value});
    }

    useEffect(async()=>{
        const response = await api.get('api/?results=10');
        setTasks(response.data.results);
    },[])
    
    return(
        <>
            <Header/>
            <div className="background">
                <div className="tasksContainer">
                    {tasks.map(task=>{
                        return(
                            <div key={task.name.first} onClick={(event)=>handleTaskFocus(event,task)}>
                                Tarefa: {task.name.first} {task.name.last}<br/>
                                Prioridade: 
                            </div>
                        );
                    })}
                </div>
                {
                <div>
                    <div className="sortTasksContainer">
                        Ordernar tarefas por: 
                        <div>
                            <label> 
                                <input type="radio" name="sort" id="data"  value="data" onChange={changeSorting} checked/>
                                Data de criação
                            </label>
                        </div>

                        <div>
                            <label>
                                
                                <input type="radio"  name="sort" id="priority" value="priority" onChange={changeSorting}/>
                                Prioridade
                            </label>
                        </div>
                    </div>
                    <div className="newTasksContainer">
                        Criar nova tarefa<br/>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nome:
                                <input type="text" name="name" required onChange={handleUpdate} value={formValues.name}/>
                            </label>
                            <div>
                                <label>
                                    <input type="radio"  name="prioridade" onChange={handleUpdate} value="alta" checked={formValues.prioridade==="alta"}/>
                                    Alta
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio"  name="prioridade" onChange={handleUpdate} value="baixa" checked={formValues.prioridade==="baixa"}/>
                                    Baixa
                                </label>
                            </div>
                            <button type="submit">Criar tarefa</button>
                        </form>
                    </div>
                </div>}
            </div>
        </>
    )
} 