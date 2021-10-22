import Row from "./row";

export default ({ provided, objectives, toggle, expandStatus }) => (
  <tbody ref={provided.innerRef} {...provided.droppableProps}>
    {(objectives || []).map((row, index) => [
      <Row key={row.id} row={row} toggle={toggle} index={index} />,
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
);
