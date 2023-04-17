import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import styled from "styled-components";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const SBody = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <SBody className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={
              <Login />
            }/>

            <Route path="/dashboard" element={
              <Dashboard />
            }/>

            
          </Routes>
        </SBody>
      </AuthProvider>
    </Router>
  );
}

export default App;
