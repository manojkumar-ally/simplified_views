import { useState } from "react";
import { COLUMNS } from "./constants";
import Row from "./renderRow";
import useResize from "./useResize";
import $ from "jquery";

import "./styles.css";

export default ({ data }) => {
  const [expandStatus, setExpandStatus] = useState({});
  const onDrag = (dragId, newWidth) => {};

  const [onElementClick] = useResize(onDrag);

  const toggle = (rowId) => {
    setExpandStatus({ ...expandStatus, [rowId]: !expandStatus[rowId] });
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
          <tbody>
            {(data || []).map((row) => [
              <Row key={row.id} row={row} toggle={toggle} />,
              ...(expandStatus[row.id]
                ? row.children.map((child) => (
                    <Row key={child.id} row={child} toggle={toggle} />
                  ))
                : [])
            ])}
          </tbody>
        </table>
      </div>
    </div>
  );
};
