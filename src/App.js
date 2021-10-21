import { useRef } from "react";
import "./styles.css";

import ColumnResize from "./columnResize";
import { generateData } from "./randomGenerate";

export default function App() {
  let data = useRef(generateData(10, true));

  const groupings = [
    { key: "none", name: "None" },
    { key: "type", name: "Type" },
    { key: "owner", name: "Owner" },
    { key: "time_period", name: "Time Period" }
  ];

  return (
    <div className="relative">
      <div className="flex m-b-10">
        <div className="m-l-10">Grouping: </div>
        {groupings.map(({ key, name }) => (
          <div key={key} className="m-l-10 pointer">
            {name}
          </div>
        ))}
      </div>
      <div className="content">
        <ColumnResize data={data.current} />
      </div>
    </div>
  );
}
