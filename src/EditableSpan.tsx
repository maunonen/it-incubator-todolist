import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input, TextField} from "@material-ui/core";


type EditableSpanPropsType =  {
  title : string 
  changeTitle : (title : string ) => void
}

function EditableSpan (props : EditableSpanPropsType) {

  const[editMode, setEditMode] = useState(false)
  const[title, setTitle] = useState(props.title)

  const onEditMode = () => setEditMode(true)
  const ofEditMode = () => {
    props.changeTitle(title)
    setEditMode(false)
  }
  
  const onChangeTitle = (e : ChangeEvent<HTMLInputElement> ) => {
    setTitle(e.currentTarget.value)
  }
  //const onChangeSpan = () => 
  return (
        editMode  
        ?
            <Input
                color={"primary"}
                /*variant={"standard"}*/
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={ofEditMode}
            />
            /*<TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={ofEditMode}
          >
          </TextField>*/
/*
            <input
              value={title}
              autoFocus
              onChange={onChangeTitle}
              onBlur={ofEditMode}
          />
*/
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    
  )
}

export default EditableSpan