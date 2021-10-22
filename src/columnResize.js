import { useState } from "react";
import useResize from "./useResize";

import Table from "./Table";

export default ({ data }) => {
  const [objectives, updateObjectives] = useState(data);
  const [expandStatus, setExpandStatus] = useState({});

  const [onElementClick] = useResize();

  const toggle = (rowId) => {
    setExpandStatus({ ...expandStatus, [rowId]: !expandStatus[rowId] });
  };

  const onRowDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      // user drags and drops at the same position
      return;
    }

    const splicedObj = objectives.splice(source.index, 1);
    objectives.splice(destination.index, 0, splicedObj[0]);
    updateObjectives(objectives);
  };

  return (
    <div className="view">
      <div className="wrapper">
        <Table
          onElementClick={onElementClick}
          onRowDragEnd={onRowDragEnd}
          objectives={objectives}
          expandStatus={expandStatus}
          toggle={toggle}
        />
      </div>
    </div>
  );
};
