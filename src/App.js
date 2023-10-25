import "./App.css";
import {
  Login,
  Redirect,
  Signup,
  Home,
  Transaction,
  Notification,
} from "pages";
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
