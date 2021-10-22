import { COLUMNS } from "../constants";

export default ({ onElementClick }) => (
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
);
