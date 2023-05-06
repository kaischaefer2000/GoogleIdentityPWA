import React from "react";
import "./App.css";
import Maps from "./components/Maps";
import DeviceInfo from "./components/Deviceinfo";
import AppList from "./components/AppList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function App() {
  return (
    <div>
      <div style={{ margin: "30px" }}>
        <Accordion
          style={{ backgroundColor: "#eaeaea" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Google Maps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Maps />
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{ backgroundColor: "#eaeaea" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>Devices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DeviceInfo />
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{ backgroundColor: "#eaeaea" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3a-content'
            id='panel3a-header'
          >
            <Typography>Apps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AppList />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default App;
