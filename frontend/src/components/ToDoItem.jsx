import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

function ToDoItem(props) {
  const handleClick = (e) =>{
    e.preventDefault()
    props.onToggle(props.id)
  }
 
  return (
    <div>
      <p>
      {props.checked ? <CheckBoxIcon style={{ color: "green", float:"left" }} onClick={handleClick}/> : <CheckBoxOutlineBlankIcon style={{float:'left'}} onClick={handleClick}/> }
       <span>{props.text}</span> 
       <DeleteIcon style={{float:"right",color:"red"}} onClick={() => {
        props.onDelete(props.id);
      }}/>
      </p>
      
    </div>
  );
}

export default ToDoItem;
