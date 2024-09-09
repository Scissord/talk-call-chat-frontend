import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-4", "task-5"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-6"],
    },
  },
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
    "task-4": { id: "task-4", content: "Task 4" },
    "task-5": { id: "task-5", content: "Task 5" },
    "task-6": { id: "task-6", content: "Task 6" },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Test = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="columns"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: "flex" }}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              return (
                <Draggable draggableId={column.id} index={index} key={column.id}>
                  {(provided) => (
                    <div
                      className="column"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: "0 8px",
                        padding: "8px",
                        border: "1px solid lightgrey",
                        borderRadius: "4px",
                        width: "220px",
                        backgroundColor: "white",
                      }}
                    >
                      <h3>{column.title}</h3>
                      <Droppable droppableId={column.id} type="task">
                        {(provided) => (
                          <div
                            className=""
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ padding: "8px", background: "#f4f4f4" }}
                          >
                            {column.taskIds.map((taskId, index) => {
                              const task = data.tasks[taskId];
                              return (
                                <Draggable
                                  draggableId={task.id}
                                  index={index}
                                  key={task.id}
                                >
                                  {(provided) => (
                                    <div
                                      className="task"
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        padding: "8px",
                                        margin: "0 0 8px 0",
                                        backgroundColor: "white",
                                        border: "1px solid lightgrey",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      {task.content}
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Test;
