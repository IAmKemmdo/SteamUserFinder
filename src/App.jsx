import React from "react";
import { Routes, Route } from "react-router-dom";
import Glowna from "./pages/Glowna";
import StronaUzyt from "./components/StronaUzyt";
import Awatar from "./components/Awatar";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Glowna />} />
      <Route path="/profile/:id" element={<StronaUzyt />} />
      <Route path="/avatar/:id" element={<Awatar />} />
    </Routes>
  );
}