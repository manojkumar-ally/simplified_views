import Row from "./row";

const RenderList = ({ objectives, expandStatus, toggle }) =>
  (objectives || [])
    .filter(({ type }) => type !== "group")
    .map((row, index) => [
      <Row key={row.id} row={row} toggle={toggle} index={index} />,
      ...(expandStatus[row.id]
        ? row.children.map((child) => (
            <Row
              isChild
              key={child.id}
              row={child}
              toggle={toggle}
              index={`${child.id}-${index}`}
            />
          ))
        : [])
    ]);

const RenderGroups = ({ groups, expandStatus, toggle }) => {
  const tableRows = [];
  (groups || [])
    .filter(({ type }) => type === "group")
    .forEach((group) => {
      tableRows.push(
        <tr key={group.value} class="group-row">
          <td>
            <strong>{group.name}:</strong> {group.value}
          </td>
        </tr>
      );

      tableRows.push(
        <RenderList
          key={`list-${group.value}`}
          objectives={group.objectives}
          expandStatus={expandStatus}
          toggle={toggle}
        />
      );
    });

  return tableRows;
};

const Body = ({ provided, data, groupKey, toggle, expandStatus }) => (
  <tbody ref={provided.innerRef} {...provided.droppableProps}>
    {groupKey === "none" ? (
      <RenderList
        objectives={data}
        expandStatus={expandStatus}
        toggle={toggle}
      />
    ) : (
      <RenderGroups groups={data} expandStatus={expandStatus} toggle={toggle} />
    )}
    {provided.placeholder}
  </tbody>
);

export default Body;
