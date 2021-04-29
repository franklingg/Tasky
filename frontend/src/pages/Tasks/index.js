import React,{useEffect,useState} from 'react';
import Header from '../../components/Header';
import MyInput from '../../components/MyInput';
import api from '../../service/api';
import './styles.css';

export default function Tasks(props) {
    
    const [tasks,setTasks] = useState([]);
    const [selectedTask,setSelectedTask] = useState(null);
    const [formValues,setFormValues] = useState({name:"",prioridade:"baixa"});
    const [sorting,setSorting] = useState(true);
    const token=localStorage.getItem('token');
    const [loading,setLoading] = useState(true);

    const middleware = () => Boolean(localStorage.getItem('token'));

    function logout(){
        localStorage.removeItem('token');
        props.history.push('/');
    }

    useEffect(async()=>{
        await refreshPage();
    },[sorting]);

    async function refreshPage() {
        setLoading(true);
        const command = sorting ? 'tasks/' : 'tasks/sort/';
        const response = await api.get(command,{'headers':{'authorization':'Bearer '+token}});
        setTasks(response.data);
        setLoading(false)
    }

    function handleTaskFocus(event,task) {
        setSelectedTask(task);
        console.log(selectedTask);
    }

    async function handleDeleteTask() {
        await api.delete('tasks/remove/'+selectedTask._id,{'headers':{'authorization':'Bearer '+token}});
        setSelectedTask(null);
        await refreshPage();
    }

    function changeSorting(event) {
        setSorting(!sorting);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await api.post('tasks/add',{'name':formValues.name,'highPriority':formValues.prioridade==='alta'},{'headers':{'authorization':'Bearer '+token}});
        await refreshPage();
    }

    async function handleUpdate(event) {
        event.preventDefault();
        await api.put('tasks/update/'+selectedTask._id,{'name':selectedTask.name,'highPriority':selectedTask.highPriority},{'headers':{'authorization':'Bearer '+token}});
        await refreshPage();
        setSelectedTask(null);
    }

    function handleUpdateInput(event) {
        setFormValues({...formValues,[event.target.name]:event.target.value});
    }
    
    return(
        middleware() ?
            <>
            <Header action={logout} first="Logout"/>
            <div className="background">
                {loading?<div className="loadingContainer"><i className="fa fa-cog fa-spin" /></div>:
                <div className="tasksContainer">
                    {tasks.map(task=>{
                        return(
                            <div key={task._id} onClick={(event)=>handleTaskFocus(event,task)}>
                                <p>{task.name}</p>
                                <p>Prioridade: {task.highPriority?'Alta':'Baixa'}</p>
                            </div>
                        );
                    })}
                    {tasks.length===0 && <span>Você ainda não criou nenhuma tarefa.</span>}
                </div>}
                <div>
                    <div className="sortTasksContainer">
                        <h3>Ordernar tarefas por</h3>
                        <div>
                            <label> 
                                <input type="radio" name="sort" id="data" onChange={changeSorting} checked={sorting}/>
                                Data de criação
                            </label>
                            <label>
                                
                                <input type="radio"  name="sort" id="priority" onChange={changeSorting} checked={!sorting}/>
                                Prioridade
                            </label>
                        </div>
                    </div>
                    {selectedTask===null?
                    <div className="newTasksContainer">
                        <h3>Criar nova tarefa</h3>
                        <form onSubmit={handleSubmit}>
                            <MyInput label='Nome' varName='name' onChange={handleUpdateInput} value={formValues.name}/>
                            <div className='checkboxesWrapper'>
                                <h4>Prioridade</h4>
                                <label>
                                    <input type="radio"  name="prioridade" onChange={handleUpdateInput} value="alta" checked={formValues.highPriority==="alta"}/>
                                    Alta
                                </label>
                                <label>
                                    <input type="radio"  name="prioridade" onChange={handleUpdateInput} value="baixa" checked={formValues.highPriority==="baixa"}/>
                                    Baixa
                                </label>
                            </div>
                            <div className='buttonWrapper'>
                                <button type="submit">Criar tarefa</button>
                            </div>
                        </form>
                    </div>:
                    <div className="newTasksContainer">
                        <h3>Editar tarefa</h3>
                        <form onSubmit={handleUpdate}>
                            <MyInput label='Nome' varName='name' onChange={(event)=>setSelectedTask({...selectedTask,[event.target.name]:event.target.value})} value={selectedTask.name}/>
                            <div className='checkboxesWrapper'>
                                <h4>Prioridade</h4>
                                <label>
                                    <input type="radio"  name="highPriority" onChange={(event)=>setSelectedTask({...selectedTask,[event.target.name]:true})} value={true} checked={selectedTask.highPriority}/>
                                    Alta
                                </label>
                                <label>
                                    <input type="radio"  name="highPriority" onChange={(event)=>setSelectedTask({...selectedTask,[event.target.name]:false})} value={false} checked={!selectedTask.highPriority}/>
                                    Baixa
                                </label>
                            </div>
                            <div className='buttonWrapper'>
                                <button type="submit">Editar tarefa</button>
                                <button onClick={handleDeleteTask}>Excluir tarefa</button>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
            </> :
            <>
            {props.history.push('/forbidden')}
            </>
    )
} 