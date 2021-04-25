import React,{useEffect,useState} from 'react';
import Header from '../../components/Header';
import api from '../../service/api';
import './styles.css';

export default function Tasks() {
    
    const [tasks,setTasks] = useState([]);
    
    useEffect(async()=>{
        const response = await api.get('api/?results=10');
        console.log(response.data);
        setTasks(response.data.results);
    },[])
    
    return(
        <>
            <Header/>
            <div className="background">
                <div className="tasksContainer">
                    {tasks.map(task=>{
                        return(
                            <div className="task">
                                {task.name.first} {task.name.last}
                            </div>
                        );
                    })}
                </div>
                
                {/*
                <div>
                    <SortTasks/>
                    <AddNewTaks/>
                </div>*/}
            </div>
        </>
    )
} 