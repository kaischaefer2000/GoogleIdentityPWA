import React from "react";
import Button from "@mui/material/Button";
import TableApps from "./TableApps";
import axios from "axios";
import AppCategoriesTable from "./TableAppCategories";
import AppPricesTable from "./TableAppPrices";

interface App {
  title: string;
  firstInstallationTime: string;
  category: string;
  price: string;
}

interface Category {
  category: string;
  count: number;
}

interface Price {
  price: string;
  count: number;
}

function AppList() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [appList, setAppList] = React.useState<App[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [prices, setPrices] = React.useState<Price[]>([]);

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

    let formattedItems = filteredContent.map((item: App) => {
      const firstInstallationTime = new Date(
        item.firstInstallationTime
      ).toLocaleDateString();
      return { ...item, firstInstallationTime };
    });

    formattedItems = formattedItems.filter(
      (item) => !item.title.startsWith("com.")
    );

    const cache: string[] = [];

    const fetchData = async () => {
      const promises = formattedItems.map(async (obj, index) => {
        if (index < 100) {
          // if (cache.includes(obj.title)) {
          //   return {
          //     ...obj,
          //     category: "not_available",
          //     price: "not_available",
          //   };
          // } else {
            const response = await axios.get(
              `https://api.appbrain.com/v2/info/search?apikey=p26373.au94ao5768eamjb5t96da&query=${encodeURIComponent(
                obj.title
              )}&format=json`
            );
            const { apps } = response.data;
            const category =
              apps.length > 0 ? apps[0].marketCategory : "unknown";
            const price = apps.length > 0 ? apps[0].price : "unknown";
            cache.push(obj.title);
            return { ...obj, category, price };
          // }
        } else {
          return { ...obj, category: "not_available", price: "not_available" };
        }
      });
      const results = await Promise.all(promises);
      
      setAppList(results);

      //// Create category array
      const categories = results.map((item) => item.category);

      const categoryCounts = categories.reduce((accumulator, category) => {
        if (!accumulator[category]) {
          accumulator[category] = {
            category,
            count: 1,
          };
        } else {
          accumulator[category].count++;
        }
        return accumulator;
      }, {});

      let groupedCategories: Category[] = Object.values(categoryCounts);
      groupedCategories = groupedCategories.sort((a, b) => b.count - a.count);

      setCategories(groupedCategories);

      //// Create price array
      const prices = results.map((item) => item.price);

      const priceCounts = prices.reduce((accumulator, price) => {
        if (!accumulator[price]) {
          accumulator[price] = {
            price,
            count: 1,
          };
        } else {
          accumulator[price].count++;
        }
        return accumulator;
      }, {});

      let groupedPrices: Price[] = Object.values(priceCounts);
      groupedPrices = groupedPrices.sort((a, b) => b.count - a.count);

      setPrices(groupedPrices);
    };
    (async () => {
      await fetchData();
    })();
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(selectedFile);
    }
  };

  React.useEffect(() => {
    if (appList.length > 0) {
      // Array in ein JSON-Objekt konvertieren
      const jsonData = JSON.stringify(appList);

      // JSON-Objekt in eine Datei schreiben
      const filename = "data.json";
      const file = new Blob([jsonData], { type: "application/json" });
      const fileUrl = URL.createObjectURL(file);

      // Datei automatisch herunterladen
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
    }
  }, [appList]);

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

      {appList.length > 0 && categories.length > 0 && prices.length > 0 ? (
        <>
          <div
            style={{
              paddingLeft: "50px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Anzahl Apps: {appList.length}
          </div>
          <AppPricesTable prices={prices} />
          <AppCategoriesTable categories={categories} />
          <TableApps apps={appList} />
        </>
      ) : null}
    </div>
  );
}

export default AppList;
