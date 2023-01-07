import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { images } from "../assets/images.jsx";

const slides = images.map(({ original, width, height }) => ({
  src: original,
  width,
  height,
}));

function Media() {
  const [index, setIndex] = useState(-1);

  const handleClick = (index, item) => setIndex(index);

  return (
    <div style={{ backgroundColor: "#301934" }}>
      <h1 style={{textAlign: 'center', marginBottom: '0', paddingBottom: '0'}}>OnTheLine Tour 2022</h1>
      <p style={{textAlign:'center', marginTop: '0', paddingTop: '0'}}>Sponsored by MVP Disc Sports</p>
      <Gallery
        images={images}
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

export default Media;
