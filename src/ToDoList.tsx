import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm'
import {FilterValuesType, TaskStateType, TaskType} from "./App";
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

type ToDoListPropsType = {
    todoListID : string
    title: string
    filter : FilterValuesType
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID :string) => void
    removeTask: (taskID: string, todoListID :string) => void
    addTask : (title : string, todoListID :string) => void
    changeTaskStatus : (taskID: string, newIsDoneValue : boolean, todoListID :string)  => void
    removeTodoList : ( todolistID : string) => void
    changeTaskTitle : (taskID : string, newTitle : string , todoListID : string) => void
    changeTodoListTitle : (title: string, todoListID : string ) => void
}

type AutoType = {
    color : string,
    year : string,
    vehicle  : number
}
function ToDoList( props : ToDoListPropsType) {
    /* const [title , setTitle] = useState<string>("")
    const [error , setError] = useState<boolean>(false) */
    const [car, setCar ] = useState<AutoType>({
        color: '',
        year : '',
        vehicle : 1990
    })
    
    const tasks = props.tasks.map((item, id) => {
        const removeTask = () => {props.removeTask(item.id, props.todoListID)}
        const changeTaskTitle = (title : string) => {
          props.changeTaskTitle(item.id, title, props.todoListID)
        }
        
        return <li key={item.id} className={item.isDone? "is-done" : "" }>
            <Checkbox
                color={"primary"}
                checked={item.isDone}
                onChange={(e) => { props.changeTaskStatus(item.id, e.currentTarget.checked, props.todoListID)} }
            />
            {/*<input
                        type="checkbox"
                        checked={item.isDone}
                        onChange={(e) => { props.changeTaskStatus(item.id, e.currentTarget.checked, props.todoListID)} }
                    />*/}
                    <EditableSpan
                      changeTitle={changeTaskTitle}
                      title={item.title}
                    />
                    {/* <span>{item.title}</span> */}
                    {/*<button onClick={ removeTask}>X</button>*/}
                    <IconButton
                        onClick={removeTask}
                    >
                        <Delete/>
                    </IconButton>
                </li>
    })
    
    
    const setAllFilterValue = () => {props.changeTodoListFilter('all', props.todoListID)}
    const setActiveFilterValue = () => {props.changeTodoListFilter('active', props.todoListID)}
    const setCompletedFilterValue = () => {props.changeTodoListFilter('completed', props.todoListID)}

    /* const errorMessage = error
        ? <div style={{ color : "red"}}>Title is required</div>
        : null */

/*     const addTask = () => {
        const trimmedTitle = title.trim()
        if ( trimmedTitle ){
            props.addTask(title, props.todoListID)
            //setError(false)
        } else {
            setError(true)
            setTimeout( ()=> {
                setError(false)
            }, 2000 )
        }
        setTitle('')
    }
 */    /* const onKeyPressAddTask = (e : KeyboardEvent<HTMLInputElement> ) => {
        if ( e.key === "Enter") {
            addTask()
        }
    } */
    /* const onChangeTitle = (e : ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value)
    } */
    const handleCarColor = (e : ChangeEvent<HTMLInputElement>) => { setCar({...car, color : e.currentTarget.value})}
    const handleCarYear = (e : ChangeEvent<HTMLInputElement>) => { setCar({...car, year : e.currentTarget.value})}
    const handleCarVehicle = (e : ChangeEvent<HTMLInputElement>) => { setCar({...car, vehicle : parseInt(e.currentTarget.value)})}
    const handleShowCar = () => console.log(car)
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title : string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title : string) => {
      props.changeTodoListTitle(title, props.todoListID)
    }
    
    return (
        <>
            <div>
                {/* <h3>{ props.title }</h3> */}
                <EditableSpan
                  title={props.title}
                  changeTitle={changeTodoListTitle}
                />
                <IconButton
                    onClick={onClickRemoveTodoList}
                >
                    <Delete/>
                </IconButton>
                <AddItemForm
                  addItem={addTask}
                />

                <ul style={{listStyle:"none", paddingLeft: "0px"}}>
                    { tasks }
                </ul>
                <div>
                    <Button
                        style={{ marginRight: "3px"}}
                        size={"small"}
                        variant={ props.filter === "all" ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={setAllFilterValue}
                    >All</Button>
                    <Button
                        style={{ marginRight: "3px"}}
                        size={"small"}
                        variant={ props.filter === "active" ?  "contained" : "outlined"}
                        color={"primary"}
                        onClick={setActiveFilterValue}
                    >Active</Button>
                    <Button
                        size={"small"}
                        variant={ props.filter === "completed" ?  "contained" : "outlined"}
                        color={"primary"}
                        onClick={setCompletedFilterValue}
                    >Completed</Button>
                </div>
            </div>
        </>
    )


}

export default ToDoList;