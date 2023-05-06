import React from "react";
import Button from "@mui/material/Button";
import BasicStack from "./Stack";

const relevantKeys = [
  "sync_user_agent",
  "device_type",
  "manufacturer",
  "device_form_factor",
  "os_type",
  "model",
];

function DeviceInfo() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [deviceInfos, setDeviceInfos] = React.useState({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const contentRaw = JSON.parse(e.target?.result as string);
    const content = contentRaw["Device Info"];

    content.forEach((obj: any) => {
      for (const key in obj) {
        if (!relevantKeys.includes(key)) {
          delete obj[key];
        }
        if (key === "sync_user_agent") {
          obj[key] = obj[key]
            .replace(/[^a-zA-Z\s]/g, "")
            .replace(/channelstable/gi, "");
        }
      }
    });
    setDeviceInfos(content);
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
      <div style={{ padding: "20px 30px", background: "lightgrey" }}>
        <h2>Devices</h2>
        <p>
          <b>Path:</b> takeout-20230331T124008Z-001\Takeout\Chrome\Device
          Information.json
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

      {deviceInfos ? <BasicStack devices={deviceInfos} /> : null}
    </div>
  );
}

export default DeviceInfo;
