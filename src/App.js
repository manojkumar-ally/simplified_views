import { useRef, useState, useEffect } from "react";
import { groupBy } from "lodash";
import "./styles.css";

import ViewsTable from "./viewsTable";
import { generateData } from "./randomGenerate";

const groupings = [
  { key: "none", name: "None", value: null },
  { key: "type", name: "Type", value: "type" },
  { key: "owner", name: "Owner", value: "owner" },
  { key: "time_period", name: "Time Period", value: "time_period" }
];

export default function App() {
  let objectives = useRef(generateData(10, true));
  let [data, setData] = useState(objectives.current);
  let [groupKey, setGroupKey] = useState("none");

  useEffect(() => {
    if (groupKey !== "none") {
      const group = groupings.find(({ key }) => key === groupKey);
      const groupedObjectives = groupBy(objectives.current, group.value);
      const columnValues = Object.keys(groupedObjectives);
      const rows = [];
      columnValues.forEach((value) => {
        rows.push({
          key: group.key,
          name: group.name,
          value: value,
          type: "group",
          objectives: groupedObjectives[value]
        });
      });
      setData(rows);
    } else {
      setData(objectives.current);
    }
  }, [groupKey]);

  return (
    <div className="relative">
      <div className="m-b-10">
        <div className="m-l-10">
          <strong>Grouping: </strong>
        </div>
        {groupings.map(({ key, name, value }) => (
          <div
            key={key}
            onClick={() => setGroupKey(key)}
            className="m-l-10 pointer"
          >
            {key === groupKey ? "=> " : null}
            {name}
          </div>
        ))}
      </div>
      <div className="content">
        <ViewsTable data={data} groupKey={groupKey} />
      </div>
    </div>
  );
}
