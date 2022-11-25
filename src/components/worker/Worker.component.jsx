import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteWorkerData,
  setWorkerData,
} from "../../store/worker/worker-action-creator";
import { placeholderImg } from "../../utils/placeholderImage";

import PreviewItem from "../preview-item/PreviewItem.component";

const Worker = ({ worker }) => {
  const dispatch = useDispatch();
  const { workers } = useSelector((state) => state.worker);
  const { id, name, profile_pic } = worker;

  const deleteWorkerHandler = async (id) => {
    const { error } = await deleteWorkerData(id);
    if (error) return;
    const updWorkersRecords = workers.filter((m) => m.id !== id);
    dispatch(setWorkerData(updWorkersRecords));
  };

  return (
    <PreviewItem
      id={id}
      image={profile_pic ? profile_pic : placeholderImg(name[0])}
      detailsLink={`/workers/${id}`}
      name={name}
      editLinkState={{ page: "editWorker", workerId: id }}
      editLink="/workers/edit"
      deleteFunction={deleteWorkerHandler}
    />
  );
};

export default Worker;
