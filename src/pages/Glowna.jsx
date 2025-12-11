import "../style/Glowna.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Glowna() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() === "") {
      setError("Pole nie może być puste");
      return;
    }
    setError("");
    navigate(`/profile/${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="container">
      <h1>Steam User Finder</h1>
      <div className="card">
  <form onSubmit={handleSubmit}>
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="SteamID64 wybranego użytkownika"
      aria-label="search"
    />
    <Button type="submit">Szukaj</Button>
</form>
      </div>
      <h6>By Tomasz Woźny</h6>
    </div>
  );
}