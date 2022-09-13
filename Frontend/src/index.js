import { createRoot } from 'react-dom/client'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import Library from './components/Library'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const routing = (  
//   <Router>  
//     <div>  

//       <Route exact path="/" component={App} />  
//       <Route path="/homepage" component={HomePage} />  

//     </div>  
//   </Router>  
// )  
// ReactDOM.render(routing, document.getElementById('root'));  

// const rootElement = document.getElementById("root");

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/library" element={<Library />} />
      {/* {(localStorage.getItem('login')===true) ? <Route path="homepage" element={<HomePage />} /> : null} */}
    </Routes>
  </BrowserRouter>
);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
