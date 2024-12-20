import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"

function App() {
  var current_date = new Date();
  const names_months = ["January", "February", "March",
    "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"
  ];
  const [input, setInput] = useState("")
  const [purpose, setPurpose] = useState("")

  const signRecord = async function () {
    // 1. create entry object {user: ..., time: , exit: NULL, purpose: ...}
    var writeable = {
      "user": input,
      "date_in": current_date.getDate(),
      "time_in": current_date.getTime(),
      "date_out": null, "date_in": "null",
      "purpose": purpose
    }

    // 2. write to database
    await setDoc(db, "attendance/library/logs", writeable)
  }

 names_months[current_date.getMonth()]
  return (
    <div className="container">
      <div className="header">
        <h1>Logbook</h1>
        <h2>{names_months[current_date.getMonth()]}</h2>
      </div>
      <div className="page">
        <input
          type="text"
          name="admno"
          placeholder="Enter admission number..."
          onChange={function (e) {
            setInput(e.target.value)
          }}></input>
        <input
          type="text"
          name="purpose"
          placeholder="Purpose of visit"
          onChange={function (e) {
            setPurpose(e.target.value)
          }}></input>
        <button type="button" name="add" onClick={signRecord}>Sign log book</button> 
      </div>
    </div>
  );
}

export default App;
