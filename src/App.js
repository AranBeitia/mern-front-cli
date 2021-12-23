import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { AuthProvider } from "./context/AuthContext";

import Home from "./ui/views/pages/Home/Home";
import Login from "./ui/views/pages/Login";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Container>
  );
}

export default App;
