const titles = [
  "Research and improve customer satisfaction",
  "Simplify & clarify our product",
  "Increase recurring revenues",
  "Finish raising new capital for our growth needs"
];

const owners = ["Manoj", "Rajesh", "Sadique"];

const type = ["Individual", "Team", "Organization"];

const timePeriods = ["Q1 2020", "Q2 2020", "Q3 2020", "Q4 2020"];

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

const generateObjective = (idx, children = false) => {
  let objective = {};
  objective.id = `${children ? "child-" : ""}${idx}`;
  objective.title = titles[getRandom(titles.length)];
  objective.owner = owners[getRandom(owners.length)];
  objective.time_period = timePeriods[getRandom(timePeriods.length)];
  objective.type = type[getRandom(type.length)];
  objective.progress = getRandom(100);
  objective.score = "-";
  objective.child = children;
  return objective;
};

export const generateData = (count, childrenFlag = true) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const objective = generateObjective(i);
    if (childrenFlag) {
      objective.children = [generateObjective(i, true)];
    }
    data.push(objective);
  }
  return data;
};
