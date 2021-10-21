import { COLUMNS } from "./constants";

export default ({ row, toggle }) => (
  <tr className="row" key={row.id}>
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
);
