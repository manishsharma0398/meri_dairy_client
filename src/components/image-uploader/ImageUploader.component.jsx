import React from "react";

import "./image-uploader.styles.scss";

const ImageUploader = ({
  previewImage,
  rawImage,
  onFileChange,
  onSelectImgClear,
}) => {
  return (
    <div className="img-container">
      <div className="img-preview">
        {rawImage || previewImage ? (
          <img src={previewImage} alt="" />
        ) : (
          <h1>No Image Selected</h1>
        )}
      </div>

      <div className="img-actions">
        <button type="button" className="select">
          <label htmlFor="imgFile">Select Image</label>
          <input type="file" id="imgFile" onChange={onFileChange} />
        </button>
        <button className="clear" onClick={onSelectImgClear} type="button">
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
