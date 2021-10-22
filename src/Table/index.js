import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "./header";
import Body from "./body";

export default ({
  onElementClick,
  onRowDragEnd,
  objectives,
  expandStatus,
  toggle
}) => (
  <div className="view">
    <div className="wrapper">
      <table>
        <Header onElementClick={onElementClick} />
        <DragDropContext onDragEnd={onRowDragEnd}>
          <Droppable droppableId="row-droppable" key="row-droppable">
            {(provided) => (
              <Body
                provided={provided}
                objectives={objectives}
                expandStatus={expandStatus}
                toggle={toggle}
              />
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  </div>
);
