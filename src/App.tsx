import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import { AddItemForm } from './AddItemForm';
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Card, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";

export type TaskType = {
    id : string
    title : string
    isDone : boolean
}

type TodoListType = {
    id : string
    title : string
    filter : FilterValuesType
}

export type TaskStateType = {
    [key : string] : Array<TaskType>
}

export type  FilterValuesType = "all" | "active" | "completed"

function App() {
    //console.log(v1())

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoList, setTodolist ] = useState<Array<TodoListType>>([
        { id : todoListID_1, title : "What to learn", filter : "all"},
        { id : todoListID_2, title : "What to write", filter : "all"}
    ])

    const [tasks, setTasks ] = useState<TaskStateType>({
        [ todoListID_1] : [
            { id : v1(), title : 'Milk', isDone : true },
            { id : v1(), title : 'Water', isDone : true },
            { id : v1(), title : 'Beer', isDone : false }
        ],
        [ todoListID_2] : [
            { id : v1(), title : 'Milk', isDone : true },
            { id : v1(), title : 'Water', isDone : true },
            { id : v1(), title : 'Beer', isDone : false }
        ],

    })

    /*const [tasks, setTasks] = useState<Array<TaskType>>([
        { id : v1(), title : 'Milk', isDone : true },
        { id : v1(), title : 'Water', isDone : true },
        { id : v1(), title : 'Beer', isDone : false }
        ]);
*/
    /*const [filter ,setFilter] = useState<FilterValuesType>("all")*/

    /*function changeTodoListFilter(newFilterValue : FilterValuesType, todoListID : string) {
           setFilter(newFilterValue);
    }*/

    const TaskToLearn: Array<TaskType> = [
        { id : v1(), title : 'HTML', isDone : true },
        { id : v1(), title : 'CSS', isDone : true },
        { id : v1(), title : 'React', isDone : false },
    ]
    /*const tasks: Array<TaskType> = [
        { id : 1, title : 'Milk', isDone : true },
        { id : 2, title : 'Water', isDone : true },
        { id : 3, title : 'Beer', isDone : false },
    ]*/

    function removeTodoList ( todolistID : string ){
        setTodolist( todoList.filter( tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    function addTodoList (title : string){
      const newTodoListID = v1(); 
      const newTodoList : TodoListType = { 
        id : newTodoListID, 
        filter : "all", 
        title 
      }
      setTodolist([ ...todoList, newTodoList ])
      setTasks({ ...tasks, [newTodoListID] : []})
    }

    function removeTask ( taskID  : string, todoListID : string){
        /*tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks({...tasks});*/
        setTasks({...tasks, [todoListID] : tasks[todoListID].filter(task => task.id !== taskID)})
    }

    function addTask (title : string, todoListID : string){
        const newTask : TaskType = {
            id : v1(),
            title : title,
            isDone : false
        }
        setTasks({...tasks, [todoListID] : [...tasks[todoListID], newTask]})
        //setTasks({...tasks, [todoListID] : [newTask, ...tasks[todoListID]]})
    }
    function changeTaskStatus ( taskID : string, newIsDone: boolean, todoListID : string ){
        //tasks[todoListID] = tasks[todoListID].map(task => task.id === taskID ? {...task, isDone : newIsDone} : task )
        setTasks({...tasks,
            [todoListID] : tasks[todoListID].map(task => task.id === taskID ? {...task, isDone : newIsDone} : task )
        })
    }

    function changeTaskTitle ( taskID : string, newTitle : string , todoListID : string ){
      //tasks[todoListID] = tasks[todoListID].map(task => task.id === taskID ? {...task, isDone : newIsDone} : task )
      setTasks({...tasks,
          [todoListID] : tasks[todoListID].map(task => task.id === taskID ? {...task, title : newTitle} : task )
      })
  }

    function changeFilter (value: FilterValuesType, todoListID : string ){
        setTodolist(todoList.map(t => t.id === todoListID ? { ...t, filter : value } : t ));
    }

    function changeTodoListTitle (title: string, todoListID : string ){
      setTodolist(todoList.map(t => t.id === todoListID ? { ...t, title : title } : t ));
  }

    //const todoListFilter : FilterValuesType = "all"

    function getTaskForTodolist (todoList : TodoListType) {
        switch ( todoList.filter){
            case "active" :
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed" :
                return tasks[todoList.id].filter(t => t.isDone === true)
            default :
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoList.map( tl => {
        return (
            <Grid
                item
                key={tl.id}
            >
                <Paper
                    elevation={10}
                    style={{ padding:"20px"}}
                >
                    <ToDoList

                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeTodoListFilter={changeFilter}
                        addTask={addTask}
                        removeTask={removeTask}
                        tasks={getTaskForTodolist(tl)}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>


        )
    });

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{ justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography
                        variant={"h6"}
                    >
                        Todo List
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color={"inherit"}
                        onClick={()=>{alert("login")}}
                    >Login</Button>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    style={{ padding: "20px 0px"}}
                    container
                >
                    <AddItemForm
                        addItem={addTodoList}
                    />
                </Grid>
                <Grid container spacing={3}>
                    { todoListComponents }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
