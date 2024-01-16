import React, { useState, ChangeEvent } from "react";
import urgencies from "./urgency";


//code for Task List
interface Task {
  id: number;
  taskName: string;
  description: string;
  urgency: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  type EditedTaskState = { [key: number]: Task | undefined };
  const [editedTask, setEditedTask] = useState<EditedTaskState>({});

  const toggleEdit = (id: number) => {
    setEditedTask((prevEditedTasks: EditedTaskState) => ({
      ...prevEditedTasks,
      [id]: prevEditedTasks[id]
        ? undefined
        : tasks.find((task) => task.id === id),
    }));
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    taskId: number
  ) => {
    const { name, value } = e.target;

    setEditedTask((prevEditedTasks: EditedTaskState) => ({
      ...prevEditedTasks,
      [taskId]: { ...prevEditedTasks[taskId], [name]: value } as Task,
    }));
  };

  const handleEdit = (id: number) => {
    const editedTaskItem: Task | undefined = editedTask[id];
    if (editedTaskItem) {
      onEdit(id, editedTaskItem);
      toggleEdit(id);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="table">
          <th className="table">Task Name</th>
          <th className="table">Description</th>
          <th className="table">Urgency</th>
          <th className="table">Due Date</th>
          <th className="table">Actions</th>
        </tr>
      </thead >
      <tbody>
        {tasks.map(({ id, taskName, description, urgency, dueDate }: Task) => (
          <tr key={id}>
            <td className="table">
              {editedTask[id] ? (
                <input
                  name="taskName"
                  value={editedTask[id]?.taskName || ""}
                  type="text"
                  className="table"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                taskName
              )}
            </td>
            <td className="table">
              {editedTask[id] ? (
                <input
                  name="description"
                  value={editedTask[id]?.description || ""}
                  type="text"
                  className="table"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                description
              )}
            </td>
            <td className="table">
              {editedTask[id] ? (
                <select
                  name="urgency"
                  className="table"
                  value={editedTask[id]?.urgency || ""}
                  onChange={(e) => onChangeInput(e, id)}
                >
                  {urgencies.map((selectedUrgency) => (
                    <option key={selectedUrgency} value={selectedUrgency}>
                      {selectedUrgency}
                    </option>
                  ))}
                </select>
              ) : (
                urgency
              )}
            </td>
            <td className="table">
              {editedTask[id] ? (
                <input
                  name="dueDate"
                  value={editedTask[id]?.dueDate.toString().split('T')[0] || ""}
                  type="date"
                  className="table"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                dueDate
              )}
            </td>
            <td className="table">
              {editedTask[id] ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleEdit(id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => toggleEdit(id)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
