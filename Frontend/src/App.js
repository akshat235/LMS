
import './App.css';
import Library from './components/Library'
import HomePage from './components/HomePage';
import Login from './components/Login';
// import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Login/>
    {/* <Library/> */}
  </div>
    );
}

export default App;
