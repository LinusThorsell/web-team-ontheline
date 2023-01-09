import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getMediaImages, removeImage } from "../firebase";

function DisplayImageCard(props) {
  function handleRemoveImage() {
    removeImage(props.directory, props.src);
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          padding: "0.25em",
          margin: "0.25em",
          border: "1px solid white",
        }}
      >
        <img style={{ width: "5em", height: "5em" }} src={props.src} />
        <Button onClick={handleRemoveImage}>Remove</Button>
      </Card>
    </>
  );
}

export default function RemoveMedia(props) {
  const [images, setImages] = useState([]);
  const [currentFolderID, setCurrentFolderID] = useState(null);

  useEffect(() => {
    // find mediaDirectories where selectedFolder is the same as the folder
    let currentFolderDirectory = props.mediaDirectories.find(
      (mediaDirectory) => {
        return mediaDirectory.directory.foldername === props.selectedFolder;
      }
    );

    if (currentFolderDirectory) {
      setCurrentFolderID(currentFolderDirectory.docid);

      getMediaImages(currentFolderDirectory).then((images) => {
        setImages(images);
      });
    }
  }, [props.selectedFolder]);

  if (images[0] === undefined) {
    return (
      <Card sx={{ margin: "0.5em" }}>
        <h1>Select Folder</h1>
      </Card>
    );
  }

  return (
    <Card sx={{ margin: "0.5em" }}>
      <h1>Remove Media</h1>
      <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => {
          return (
            <DisplayImageCard
              directory={currentFolderID}
              src={image.src}
              key={image.src}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
