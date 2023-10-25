import "./App.css";
import Login from "components/authentication/Login";
import Home from "components/authentication/Home";
import Signup from "components/authentication/Signup";
import Main from "components/home/Home.js";
import Transaction from "components/NewTransaction/NewTransaction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/transaction/new" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
