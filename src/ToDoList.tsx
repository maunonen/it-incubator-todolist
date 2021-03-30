import React from 'react';
import './App.css';
import {TaskType} from "./App";

type ToDoListPropsType = {
    title : string
    tasks : Array<TaskType>
}

function ToDoList( props : ToDoListPropsType) {
    return (
        <>
            <div>
                <h3>{ props.title }</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map((item, id) => {
                            return <li key={item.id}><input type="checkbox" checked={item.isDone}/> <span>{item.title}</span></li>
                        } )
                    }
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </>
    )


}

export default ToDoList;