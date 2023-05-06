import React from "react";
import BasicTable from "./TableMaps";
import Button from "@mui/material/Button";

function Maps() {
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

      // create the array of objects and filter them
      const loc = Array.from(locationCountMap.entries())
        .map(([name, count]) => ({
          name,
          count,
        }))
        .filter((location) => location.count > 5);

      // sort the objects based on the number of words that are in the name
      loc.sort((a, b) => {
        const aWords = a.name.split(" ");
        const bWords = b.name.split(" ");

        return bWords.length - aWords.length;
      });

      // combine the same entries with different names together
      let newData: { name: string; count: number }[] = [];
      loc.forEach((item) => {
        const words = item.name.split(" ");
        const index = newData.findIndex((newItem) => {
          const result = words.every((word) => {
            return newItem.name
              .toLocaleLowerCase()
              .includes(word.toLocaleLowerCase());
          });
          return result;
        });
        if (index === -1) {
          newData.push({ ...item });
        } else {
          newData[index].count += item.count;
        }
      });

      // sort the locations based on the count
      newData = newData.sort((a, b) => b.count - a.count);

      // seperate name into first and lastValue
      const transformedLocations = newData.map((location) => {
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
        let lastValueComparable =
          commaIndex !== undefined
            ? location.name
                .slice(commaIndex + 1)
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-zäöüß\s]/g, "")
            : "";

        if (lastValueComparable !== "") {
          let words = lastValueComparable.split(" ");
          for (let i = 0; i < words.length; i++) {
            if (/(str|straße|weg|platz)/i.test(words[i])) {
              words.splice(i, 1);
              i--;
            }
          }
          lastValueComparable = words.join(" ");
        }
        return { ...location, firstValue, lastValue, lastValueComparable };
      });

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
          // if (anchorText.toLocaleLowerCase().includes("sartoriusstraße")) {
          //   console.log("luul");
          // }
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
    <div style={{ marginBottom: "50px" }}>
      <div style={{ padding: "20px 30px", background: "lightgrey" }}>
        <h2>Google Maps Data</h2>
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

export default Maps;
