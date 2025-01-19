import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { db } from "./firebase_config.js"
import firebase from 'firebase/compat/app';
import { query, where, doc, addDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { BarcodeScanner } from 'react-barcode-scanner'
import 'react-barcode-scanner/polyfill'


function App() {  
  var current_date = new Date();
  const names_months = ["January", "February", "March",
    "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"
  ];
  const [input, setInput] = useState("")
  const [purpose, setPurpose] = useState("")
  const [attendees, setAttendees] = useState([])

  async function getAttendees() {
    var q = query(
      collection(db, "logs", "library", "records")
    ) 
    var attendees_now = [] 
    var att = await getDocs(q);
    att.forEach(i => {
      attendees_now = [...attendees_now, i.data()]
    })

    setAttendees(attendees_now)
  }

  getAttendees()
  

  const signRecord = async function () {
    // 1. create entry object {user: ..., time: , exit: NULL, purpose: ...}
    var writeable = {
      "user": doc(db, "users", input),
      "date_in": current_date.getDate() + "-" + current_date.getMonth() + "-" + current_date.getFullYear(),
      "time_in": current_date.getTime(),
      "date_out": null, "time_out": null,
      "purpose": purpose
    }

    // 2. write to database
    await addDoc(collection(db, "logs", "library", "records"), writeable)
  }

  function getStuff() {
    return attendees.map(async function (user) {
      var details = (await getDoc(user.user)).data()
      return <li key={user}>{details.name} ({user.time_in})</li>
    })
  }

  var attendeesHTML = getStuff()
  // console.log(attendeesHTML[0])
  
  return (
    <div className="container">
      <div className="header">
        <h1>Logbook</h1>
        <h2>{names_months[current_date.getMonth()]}</h2>
      </div>
      <div className="page">
        {/* <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setInput(result.text);
          }}
        /> */}
        <BarcodeScanner options={{
          formats: ["code_128", "code_39", "code_93", "ean_13"],
          width: { min: 640, ideal: 640 },
          height: { min: 480, ideal: 640 },
          facingMode: {
            ideal: 'environment'
          },
          onCapture: (barcodes) => {
            barcodes.forEach((barcode) => alert(barcode.rawValue))
          }        
      }}/>
        <h4>{input}</h4>
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
          
        <ul className="users">
          {
            // attendeesHTML
          }
        </ul>
      </div>

    </div>
  );
}

export default App;
