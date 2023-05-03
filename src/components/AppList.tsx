import React from "react";
import BasicTable from "./TableMaps";
import Button from "@mui/material/Button";
import BasicStack from "./Stack";
import TableApps from "./TableApps";

const relevantKeys = [
  "sync_user_agent",
  "device_type",
  "manufacturer",
  "device_form_factor",
  "os_type",
  "model",
];

interface App {
  title: string;
  firstInstallationTime: string;
}

function AppList() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [appList, setAppList] = React.useState<App[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const contentRaw = JSON.parse(e.target?.result as string);
    const filteredContent: App[] = contentRaw.map((appInstall: any) => {
      const title = appInstall.install.doc.title;
      const firstInstallationTime = appInstall.install.firstInstallationTime;

      return { title, firstInstallationTime };
    });

    filteredContent.sort(
      (a: App, b: App) =>
        new Date(b.firstInstallationTime).getTime() -
        new Date(a.firstInstallationTime).getTime()
    );

    const formattedItems = filteredContent.map((item: App) => {
      const firstInstallationTime = new Date(
        item.firstInstallationTime
      ).toLocaleDateString();
      return { ...item, firstInstallationTime };
    });
    setAppList(formattedItems);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ padding: "50px", background: "lightgrey" }}>
        <h2>Upload the JSON file: 'Installs'</h2>
        <p>
          <b>Path:</b> takeout-20230331T124008Z-001\\Takeout\Google Play Store\
          Installs.json
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type='file' accept='.json' onChange={handleFileUpload} />
          <Button
            onClick={handleUpload}
            variant='contained'
            style={{ marginLeft: "50px" }}
          >
            Upload
          </Button>
        </div>
      </div>

      {appList.length > 0 ? <TableApps apps={appList} /> : null}
    </div>
  );
}

export default AppList;
