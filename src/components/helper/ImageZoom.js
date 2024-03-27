import React from "react";

const ImageZoom = ({ src }) => (
  <div
    style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
  >
    <img src={src} width="70%" />
  </div>
);

export default ImageZoom;
