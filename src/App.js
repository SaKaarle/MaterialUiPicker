import "./App.css";
import React, { useRef, useState } from "react";
import { KeyboardDateTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import 'date-fns';
import Button from '@material-ui/core/Button';
import "./index.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { TextField } from "@material-ui/core";

function App() {
  const [todo, setTodo] = useState({ descript: "", pvm: "", priority: "" });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const dateDay = selectedDate.getDate();
  const dateMonth = selectedDate.getMonth();
  const dateYear = selectedDate.getFullYear();
  

  console.log(dateDay,dateMonth,dateYear);

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  
 const changeDateTime = (date) => {
     setSelectedDate(date);
     setTodos();
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
    { headerName: "Desc", field: "descript", sortable: true, filter: true},
    { headerName: "Date", field: "pvm", sortable: true, filter: true},

    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High"
          ? { color: "red" }
          : { color: "white" },
    },
  ];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div className="App">
      <h1>todo</h1>

      <TextField type="text" label="Description" name="descript" onChange={inputChanged} value={todo.descript}/>
      
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="Date"
        value={selectedDate}
        onChange={date=>changeDateTime(date)}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd"
        
      />
      
      <TextField type="text" label="Priority" name="priority" onChange={inputChanged} value={todo.priority}/>
      <Button variant="contained" color="primary" onClick={addTodo}>Add</Button>{" "}
      <Button variant="contained" color="secondary" onClick={deleteTodo}>Del</Button>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "420px",
          width: "75%",
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
      
    </div></MuiPickersUtilsProvider>
  );
}

//JOTAIN ERROREITA LÖYTY

// EI toiminut, outoja virheitä mutta:
// npm i @date-io/date-fns@1.3.13 date-fns kalenteri toimii
// enää lisätä se ominaisuus


export default App;
