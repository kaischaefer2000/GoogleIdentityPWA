import React from "react";
import "./App.css";
import BasicTable from "./Table";
import Button from "@mui/material/Button";

function App() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [locations, setLocations] = React.useState<string[] | null>(null);
  const [cleanedLocations, setCleanedLocations] = React.useState<
    { name: string; count: number }[] | null
  >(null);

  React.useEffect(() => {
    const locationCountMap = new Map<string, number>();

    if (locations) {
      // add count of location and sum up equal locations
      locations.forEach((location) => {
        locationCountMap.set(
          location,
          (locationCountMap.get(location) || 0) + 1
        );
      });

      // create the array of objects filter and sort them
      const loc = Array.from(locationCountMap.entries())
        .map(([name, count]) => ({
          name,
          count,
        }))
        .filter((location) => location.count > 5)
        .sort((a, b) => b.count - a.count);

      // seperate name into first and lastValue
      const transformedLocations = loc.map((location) => {
        const commaIndex = location.name.includes(",")
          ? location.name.indexOf(",")
          : undefined;
        const firstValue =
          commaIndex !== undefined
            ? location.name.slice(0, commaIndex).trim()
            : location.name;
        const lastValue =
          commaIndex !== undefined
            ? location.name.slice(commaIndex + 1).trim()
            : "";
        const lastValueComparable =
          commaIndex !== undefined
            ? location.name
                .slice(commaIndex + 1)
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-zäöüß\s]/g, "")
            : "";

        return { ...location, firstValue, lastValue, lastValueComparable };
      });

      const wordsArray: string[] = [];
      transformedLocations.forEach((obj) => {
        const words = obj.lastValueComparable.split(/\s+/);
        words.forEach((word) => {
          if (word !== "") {
            wordsArray.push(word);
          }
        });
      });
      const cityMap = new Map<string, number>();

      if (wordsArray) {
        // add count of location and sum up equal locations
        wordsArray.forEach((location) => {
          cityMap.set(location, (cityMap.get(location) || 0) + 1);
        });

        // create the array of objects filter and sort them
        const cities = Array.from(cityMap.entries())
          .map(([name, count]) => ({
            name,
            count,
          }))
          .filter((location) => location.count > 3)
          .sort((a, b) => b.count - a.count);
        console.log(cities);
      }

      setCleanedLocations(transformedLocations);
    }
  }, [locations]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result as string;
    const divs = new DOMParser()
      .parseFromString(content, "text/html")
      .querySelectorAll(".mdl-typography--body-1");

    if (divs !== undefined) {
      let allSearches: string[] = [];

      divs.forEach(function (div) {
        // loop through each div tag
        const anchorTags = div.getElementsByTagName("a"); // get all anchor tags inside the div tag

        for (let i = 0; i < anchorTags.length; i++) {
          // loop through each anchor tag
          const anchorText = anchorTags[i].innerText; // get the inner text of the anchor tag
          allSearches.push(anchorText);
        }
      });

      setLocations(allSearches);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <div style={{ padding: "50px", background: "lightgrey" }}>
        <h2>Upload the HTML file: 'MeineAktivitäten Maps'</h2>
        <p>
          <b>Path:</b> takeout-20230331T124008Z-001\Takeout\Meine
          Aktivitäten\Maps\MeineAktivitäten Maps.html
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type='file' accept='.html' onChange={handleFileUpload} />
          <Button
            onClick={handleUpload}
            variant='contained'
            style={{ marginLeft: "50px" }}
          >
            Upload
          </Button>
        </div>
      </div>

      {cleanedLocations ? <BasicTable locations={cleanedLocations} /> : null}
    </div>
  );
}

export default App;
