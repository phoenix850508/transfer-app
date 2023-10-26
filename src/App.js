import "./App.css";
import {
  Login,
  Redirect,
  Signup,
  Home,
  NewTransaction,
  Notification,
  MyAccount,
  ProfileInit,
} from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction/new" element={<NewTransaction />} />
          <Route path="/setting" element={<MyAccount />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile/inialize" element={<ProfileInit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
