import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id : number
    title : string
    isDone : boolean
}

function App() {

    const TaskToLearn: Array<TaskType> = [
        { id : 1, title : 'HTML', isDone : true },
        { id : 2, title : 'CSS', isDone : true },
        { id : 3, title : 'React', isDone : false },
    ]
    const TaskToBy: Array<TaskType> = [
        { id : 1, title : 'Milk', isDone : true },
        { id : 2, title : 'Water', isDone : true },
        { id : 3, title : 'Beer', isDone : false },
    ]
    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={TaskToLearn}

            />
            <ToDoList
                title={"Songs"}
                tasks={TaskToBy}
            />
            <ToDoList
                title={"Books"}
                tasks={TaskToBy}
            />
        </div>
    );
}

export default App;
