import React from "react";
import "./App.css";
import Maps from "./components/Maps";
import DeviceInfo from "./components/Deviceinfo";
import AppList from "./components/AppList";

function App() {
  
  return (
    <div>
      <Maps />
      <DeviceInfo />
      <AppList />
    </div>
  );
}

export default App;
