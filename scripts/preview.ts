import { exec } from "child_process";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { ImageGallery, Attribute } from "./gallery";

// Inspired from https://github.com/fiveoutofnine/adopt-a-hyphen/blob/main/script/preview.js
// Run the forge script
exec(
  "forge script script/PrintFintechies.s.sol:PrintFintechies -vvv",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    const regex = /data:application\/json;base64,[a-zA-Z0-9+/]+=*/g;
    const base64Jsons = stdout.match(regex);
    const matches: {
      name: string;
      image_data: string;
      attributes: Attribute[];
    }[] = [];

    base64Jsons?.forEach((base64Json) => {
      const startIndex = base64Json.indexOf(",") + 1;
      const encodedJson = base64Json.slice(startIndex);

      try {
        const decodedJson = atob(encodedJson);
        console.log(decodedJson);
        const parsedJson = JSON.parse(decodedJson);

        if (
          parsedJson.name !== undefined &&
          parsedJson.image_data !== undefined &&
          parsedJson.attributes !== undefined
        ) {
          matches.push({
            name: parsedJson.name,
            image_data: parsedJson.image_data,
            attributes: parsedJson.attributes,
          });
        }
      } catch (e) {
        console.error("Error in decoding/parsing JSON:", e);
      }
    });

    // Render React component to HTML string
    const reactComponentHtml = ReactDOMServer.renderToString(
      React.createElement(ImageGallery, { data: matches })
    );

    // Specify the directory
    const dir = path.join(__dirname, "preview");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the React component HTML to a file
    fs.writeFile(
      path.join(dir, "index.html"),
      `<!DOCTYPE html>
      <html>
      <head>
      <title>Preview of NFTs</title>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');
      </style>
      </head>
      <body >
      ${reactComponentHtml}
      </body>
      </html>`,
      { flag: "w" },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("React component HTML saved to index.html");
        }
      }
    );
  }
);
