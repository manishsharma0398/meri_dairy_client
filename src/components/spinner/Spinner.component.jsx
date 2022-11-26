import React from "react";
import ReactDOM from "react-dom/client";

import { ImSpinner8, ImSpinner9, ImSpinner10 } from "react-icons/im";

import "./Spinner.styles.scss";

// const root = ReactDOM.createRoot(document.getElementById("spinner"));
// root.render(<Spinner />);

const Spinner = () => {
  return (
    <div className="spinner-container">
      <ImSpinner9 className="rot" />
      {/* <ImSpinner8 className="rot" />
      <ImSpinner10 className="rot" /> */}
    </div>
  );
};

export default Spinner;
