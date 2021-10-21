import { COLUMNS } from "./constants";

export default ({ row, toggle }) => (
  <div className="row" key={row.id}>
    {COLUMNS.map(({ key, className }) => (
      <div key={key} className={`column ${className}`}>
        {!row.child && key === "title" && (
          <span className="pointer" onClick={() => toggle(row.id)}>
            Toggle
          </span>
        )}
        <span className="cell">{row[key]}</span>
      </div>
    ))}
  </div>
);
