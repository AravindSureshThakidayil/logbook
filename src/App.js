import logo from './logo.svg';
import './App.css';
import {useState} from "react"

function App() {
  var current_date =new Date();
  const names_months = ["January", "February", "March",
    "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"
  ];
  var elapsed_time;
  
  const show_message = function () {
    alert("Hello!")
  };

  const press_1 = function () {
    elapsed_time = Date.now();
  }

  const press_2 = function () {
    elapsed_time = (Date.now() - elapsed_time) / 1000;
    alert(elapsed_time.toString())
  }
  //var list,setlist;
  var [list, setList] = useState([])
  const Add= function () {
    var val=document.getElementById("inp").value;
    setList([...list, {name: val}])
    console.log(list);
  }
  return (

    <div className="App">
      <h1>logbook</h1>
      <h2>{current_date.getDate()}{names_months[current_date.getMonth()]}{current_date.getFullYear()}</h2>

      <input type="text" id="inp"></input> 
      <button onClick={Add}>Add</button>
      <ul>{list.map(function (i) {return (<li>{i.name}</li>) })}</ul>

    </div>
  );
}

export default App;
