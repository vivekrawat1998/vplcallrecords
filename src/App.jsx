import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import CallRecordsGrid from "./components/userdata/Usersdata";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<CallRecordsGrid />} />
      </Routes>
    </>
  );
}

export default App;
