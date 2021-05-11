import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
  addItem : (tittle : string) => void
}

export function AddItemForm (props : AddItemFormPropsType) {

    const [title , setTitle] = useState<string>("")
    const [error , setError] = useState<boolean>(false)

    const onChangeTitle = (e : ChangeEvent<HTMLInputElement> ) => {
      setTitle(e.currentTarget.value)
    }
    
    const onClickAddItem = () => {
      const trimmedTitle = title.trim()
      if ( trimmedTitle ){
          props.addItem(trimmedTitle)
          //props.addItem(trimmedTitle, props.todoListID)
          //setError(false)
      } else {
          setError(true)
          setTimeout( ()=> {
              setError(false)
          }, 2000 )
      }
      setTitle('')
  }

    const onKeyPressAddItem = (e : KeyboardEvent<HTMLInputElement> ) => {
      if ( e.key === "Enter") {
        onClickAddItem()
      }
  }

  const errorMessage = error
        ? <div style={{ color : "red"}}>Title is required</div>
        : null


    return (

      <div>
          <TextField
              error={error}
              size={"small"}
              value={title}
              onChange={ onChangeTitle }
              onKeyPress={onKeyPressAddItem}
              helperText={error && "Title is required"}
              label={"Title"}
          ></TextField>
          <IconButton onClick={onClickAddItem}>
              <Add/>
          </IconButton>
      </div>
    )
}