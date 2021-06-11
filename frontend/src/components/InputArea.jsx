import React, { useState } from "react";


function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const {value} = event.target;
    setInputText(value)
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" name ="text" value={inputText} />
      <button
        onClick={() => {
          props.onAdd(inputText);
          setInputText("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
