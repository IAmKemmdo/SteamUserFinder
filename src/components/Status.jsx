import React from "react";
const statusy = {
  0: "Offline",
  1: "Online",
  2: "Zajęty",
  3: "Zaraz wracam",
  4: "Wolny",
  5: "Szukający wymiany",
  6: "Szukający gry",
  //Nie wiem czemu w dokumentacji api sa te 4 5 i 6 bo na steamie ich w zyciu nie widzialem ale są
};

export default function Status({ status }) {
  return (
    <span style={{padding: "5px 10px", backgroundColor: status === 1 ? "green" : "gray", color: "white", fontSize: "15px"}}>
      {statusy[status] ?? "Nieznany"}
    </span>
  );
}
