import Typography from "@mui/material/Typography";

export default function BasicStack({ devices }: any) {
  console.log(devices);
  return (
    <div style={{ padding: devices[0] ? "50px" : undefined }}>
      {devices[0]
        ? devices.map((device: any, index: number) => (
            <div>
              <h2>Device {index + 1}</h2>
              {Object.entries(device).map(([key, value]) => (
                <div style={{ display: "flex" }}>
                  <div style={{ width: "200px" }}>{key}</div>
                  <div style={{ marginLeft: "20px" }}>{value as string}</div>
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
}
