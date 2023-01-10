import { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { images } from "../assets/images.jsx";
import { getMediaDirectory, getMediaImages } from "../firebase";

function MediaGalleryLightbox(props) {
  const [index, setIndex] = useState(-1);

  const handleClick = (index, item) => setIndex(index);

  let slides = props.images.map(({ src, width, height }) => ({
    src,
    width,
    height,
  }));

  return (
    <div style={{ backgroundColor: "#301934" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "0", paddingBottom: "0" }}
      >
        {props.title}
      </h1>
      <p style={{ textAlign: "center", marginTop: "0", paddingTop: "0" }}>
        {props.sponsor}
      </p>
      <Gallery
        images={props.images}
        onClick={handleClick}
        enableImageSelection={false}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
}

function Media() {
  const [realImages, setRealImages] = useState([]);
  const [hasRequestedImages, setHasRequestedImages] = useState(false);

  useEffect(() => {
    getMediaDirectory().then((dir) => {
      setRealImages(dir);
    });
  }, []);

  if (realImages[0] && realImages[0].docid !== undefined) {
    if (realImages[0].images === null && !hasRequestedImages) {
      for (let i = 0; i < realImages.length; i++) {
        if (realImages[i].images === null && !hasRequestedImages) {
          getMediaImages(realImages[i]).then((images) => {
            let obj = realImages;
            obj[i].images = images;
            setRealImages([...obj]);
          });
        }
      }
      setHasRequestedImages(true);
    }
  }

  let preReady = true;
  for (let i = 0; i < realImages.length; i++) {
    if (realImages[i].images === null) {
      preReady = false;
    }
  }

  if (!preReady) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      {realImages.map((gallery) => {
        return (
          <MediaGalleryLightbox
            images={gallery.images}
            title={gallery.directory.title}
            sponsor={gallery.directory.sponsor}
            key={gallery.docid}
          />
        );
      })}
    </>
  );
}

export default Media;
