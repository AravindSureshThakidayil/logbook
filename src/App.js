import logo from './logo.svg';
import './App.css';

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

  return (

    <div className="App">
      <h1>logbook</h1>
      <h2>{current_date.getDate()}{names_months[current_date.getMonth()]}{current_date.getFullYear()}</h2>

      <button onClick = {press_1}>1</button> 
      <button onClick = {press_2}>2</button>  
    </div>
  );
}

export default App;
