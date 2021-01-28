import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// var db = indexedDB.open('StoreTI2', 1);
// db.onupgradeneeded = function (event) {
//     // Save the IDBDatabase interface
//     var db = event.target.result;

//     // Create an objectStore for this database
//     var store = db.createObjectStore("Messages",
//         { keyPath: ["RoomID", "UserID"] }
//     );
//     console.log(store)
// };

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
