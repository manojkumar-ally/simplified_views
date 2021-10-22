import { Draggable } from "react-beautiful-dnd";
import { COLUMNS } from "../constants";

export default ({ row, toggle, index }) => (
  <Draggable draggableId={row.id} index={index} key={`row-${row.id}`}>
    {(provided) => (
      <tr
        className="row"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {COLUMNS.map(({ key, className }) => (
          <td key={key} className={`column ${className}`}>
            <span className="cell">
              {!row.child && key === "title" && (
                <span className="pointer" onClick={() => toggle(row.id)}>
                  #&nbsp;
                </span>
              )}
              {row[key]}
            </span>
          </td>
        ))}
      </tr>
    )}
  </Draggable>
);
