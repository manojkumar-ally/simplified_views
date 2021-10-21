import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { COLUMNS } from "./constants";
import Row from "./renderRow";
import useResize from "./useResize";

import "./styles.css";

export default ({ data }) => {
  const [objectives, updateObjectives] = useState(data);
  const [expandStatus, setExpandStatus] = useState({});
  const onDrag = (dragId, newWidth) => {};

  const [onElementClick] = useResize(onDrag);

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
        <table>
          <thead className="row">
            <tr>
              {COLUMNS.map(({ name, className }) => (
                <th onClick={(e) => onElementClick(e, className)} key={name}>
                  <div className={`header ${className}`}>
                    <div className="cell">{name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <DragDropContext onDragEnd={onRowDragEnd}>
            <Droppable droppableId="row-droppable" key="row-droppable">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {(objectives || []).map((row, index) => [
                    <Row
                      key={row.id}
                      row={row}
                      toggle={toggle}
                      index={index}
                    />,
                    ...(expandStatus[row.id]
                      ? row.children.map((child) => (
                          <Row
                            key={child.id}
                            row={child}
                            toggle={toggle}
                            index={`${child.id}-${index}`}
                          />
                        ))
                      : [])
                  ])}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
};
