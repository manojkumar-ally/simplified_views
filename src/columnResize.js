import { useState } from "react";
import { COLUMNS } from "./constants";
import Row from "./renderRow";
import useResize from "./useResize";

import "./styles.css";

export default ({ data }) => {
  const [expandStatus, setExpandStatus] = useState({});
  const onDrag = (dragId, newWidth) => {
    if (dragId === "title") {
      if (newWidth > 650) newWidth = 650;
      else if (newWidth < 400) newWidth = 400;
      const contentEl = document.querySelector(".content");
      contentEl.style.marginLeft = `${newWidth}px`;
      contentEl.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const [onElementClick] = useResize(onDrag);

  const toggle = (rowId) => {
    setExpandStatus({ ...expandStatus, [rowId]: !expandStatus[rowId] });
  };

  return (
    <div className="table">
      <div className="row header-row border-bottom">
        {COLUMNS.map(({ name, className }) => (
          <div
            className={`column header ${className}`}
            onClick={(e) => onElementClick(e, className)}
            key={name}
          >
            <span className="cell">{name}</span>
          </div>
        ))}
      </div>
      {(data || []).map((row) => (
        <>
          <Row row={row} toggle={toggle} />
          {expandStatus[row.id]
            ? row.children.map((child) => <Row row={child} toggle={toggle} />)
            : null}
        </>
      ))}
    </div>
  );
};
