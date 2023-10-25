import "./App.css";
import Login from "components/authentication/Login";
import Redirect from "components/authentication/Redirect";
import Signup from "components/authentication/Signup";
import Home from "components/home/Home.js";
import Transaction from "components/NewTransaction/NewTransaction";
import Notification from "components/notification/Notification";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MyAccount from "components/myAccount/MyAccount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction/new" element={<Transaction />} />
          <Route path="/setting" element={<MyAccount />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
