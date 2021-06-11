import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import Axios from "../axios"



function App() { 
  const [items, setItems] = useState([]);
  useEffect(()=>{
    Axios({
      method:"get",
      url:"/"
    }).then(res => setItems(res.data))
 

  },[items])


  

  function addItem(inputText) {
    if(inputText){
      Axios.post("/",{text:inputText,checked:false})
      .then((res)=> console.log(res.data))
      .catch(e => console.log(e))
      setItems(prevItems => {
        return [...prevItems, {text:inputText,checked : false}];
      })
     
    }
    
  }

  function deleteItem(id) {
    
    setItems(prevItems => {
       prevItems.filter((item) => item._id !== id );
       Axios.delete("/",{data:{"id":id}})
        .then((res)=> console.log(res.data))
        .catch(e =>console.log(e))
    })
    
  }
  
  function toggleCheck(id){

    var putData = {}
    setItems(prevItems=> {
      prevItems.map((item) =>  {  
      if(id === item._id){
        const checkToAssign = item.checked 
        item.checked ? putData = {...item , checked : false} : putData = {...item , checked : true}
        item.checked = !checkToAssign
        }   
    });
    // console.log( [...prevItems,putData])
    
    // console.log( prevItems)
    Axios.put("/",putData)
    .then((res)=>{})
    .catch(e=>console.log(e))
  
    }
    )
   }


  //  const fetchPage = ()=>{
  //    Axios.get("/new")
  //    .then((res)=>console.log(res))
  //    .catch(e=>console.log(e))
  //  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
          {items ? items.map((todoItem, index) =><ToDoItem
              key={index}
              id={todoItem._id}
              text={todoItem.text}
              checked={todoItem.checked}
              onToggle={toggleCheck}
              onDelete={deleteItem}
            />
          ) : null
          }            
      </div>  
      
    </div>
  );
}

export default App;