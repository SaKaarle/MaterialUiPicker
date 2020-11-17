import "./App.css";
import React, { useRef, useState } from "react";

import "./index.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

function App() {
  const [todo, setTodo] = useState({ descript: "", pvm: "", priority: "" });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
   setTodos(
     todos.filter(
       (desc, index) =>
           index !== gridRef.current.getSelectedNodes()[0].childIndex
     )
    );
    
    if (gridRef.current.getSelectedNodes().length > 0){
      setTodos(todos.filter((todo,index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select Row')
    }
  };

  const columns = [
    { headerName: "Desc", field: "descript", sortable: true, filter: true },
    { headerName: "Date", field: "pvm", sortable: true, filter: true },
    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High" || "high"
          ? { color: "red" }
          : { color: "black" },
    },
  ];
  return (
    <div className="App">
      <h1>todo</h1>
      <input
        type="text"
        name="descript"
        onChange={inputChanged}
        value={todo.descript}
      />
      <input type="date" name="pvm" onChange={inputChanged} value={todo.pvm} />
      <input
        type="text"
        name="priority"
        onChange={inputChanged}
        value={todo.priority}
      />
      <button onClick={addTodo}>Add</button>{" "}
      <button onClick={deleteTodo}>Del</button>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "420px",
          width: "69%",
          margin: "auto",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default App;
