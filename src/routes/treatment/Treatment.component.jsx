import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import TreatmentItem from "../../components/treatment-item/TreatmentItem.component";
import DialogBox from "../../components/dialog-box/DialogBox.component";

const Treatment = () => {
  const { treatmentData } = useSelector((state) => state.treatment);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  return (
    <div className="content">
      {deleteDialogBox && <DialogBox />}
      {!treatmentData && <h2>Loading...</h2>}
      {treatmentData && treatmentData.length === 0 && (
        <h2>No Milk Records. Please add one</h2>
      )}
      {treatmentData && (
        <Link
          state={{ page: "addTreatment", treatmentId: null }}
          className="btn btn-link"
          to="/treatment/add"
        >
          Add Treatment
        </Link>
      )}
      {!treatmentData && (
        <div>
          <h2 className="err-msg">Something went wrong. Please try again</h2>
          <Link
            // onClick={getAllM}
            className="btn btn-link"
          >
            Refresh Page
          </Link>
        </div>
      )}
      {treatmentData && treatmentData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Animal</th>
              <th>Date</th>
              <th>Disease</th>
              <th>Medicine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatmentData.map((treatment, i) => (
              <TreatmentItem
                key={treatment.id}
                treatment={treatment}
                slNo={i + 1}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Treatment;
