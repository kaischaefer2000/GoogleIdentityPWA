import React from "react";
import "./App.css";
import Maps from "./components/Maps";
import DeviceInfo from "./components/Deviceinfo";
import AppList from "./components/AppList";

async function fetchAppCategory(appName: string) {
  const url = `https://www.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(
    appName
  )}/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data.details.appDetails.category;
}

function App() {
  React.useEffect(() => {
    fetchAppCategory("Keepass2Android");
  }, []);
  return (
    <div>
      <Maps />
      <DeviceInfo />
      <AppList />
    </div>
  );
}

export default App;
