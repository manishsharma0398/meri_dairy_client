import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSpinnerHandler } from "../../store/ui/ui-action-creator";

import DashboardItem from "../../components/dashboard-item/DashboardItem.component";
import DialogBox from "../../components/dialog-box/DialogBox.component";
import Spinner from "../../components/spinner/Spinner.component";
import AddLink from "../../components/add-link/AddLink.component";

import "./dashboard.styles.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { allAnimals } = useSelector((state) => state.animals);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  useEffect(() => {
    dispatch(setSpinnerHandler(false));
    setErr(null);
  }, [dispatch]);

  const { showFullBodySpinner } = useSelector((state) => state.UI);

  return showFullBodySpinner ? (
    <Spinner />
  ) : (
    <div className="content">
      {deleteDialogBox && <DialogBox />}
      {!allAnimals && !err && <h2>Loading...</h2>}
      {allAnimals && allAnimals.length === 0 && (
        <h2>No Animals added. Please add one</h2>
      )}
      {!err && (
        <AddLink
          addLink="/animals/add"
          addLinkState={{ page: "addAnimal", animalId: null }}
          linkText="Add New Animal"
        />
      )}
      {err && (
        <div>
          <h2 className="err-msg">Something went wrong. Please try again</h2>
          <Link
            // onClick={getAllAnimalDetails}
            className="btn btn-link"
          >
            Refresh Page
          </Link>
        </div>
      )}

      <div className="content-body">
        {allAnimals &&
          allAnimals.map((animal) => (
            <DashboardItem key={animal.id} animal={animal} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
