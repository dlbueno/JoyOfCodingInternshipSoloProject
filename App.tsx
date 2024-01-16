import { useState } from "react";
import TaskList from "./TaskList";
import TaskUrgency from "./TaskUrgency";
import TaskForm from "./TaskForm";
import urgencies from "./urgency";
import "./index.css";

function App() {
  const [selectedUrgency, setSelectedUrgency] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: "Study",
      description: "Read 2 books on JavaScript",
      urgency: "Medium",
      dueDate: "02/10/2023",
    },
    {
      id: 2,
      taskName: "Gym",
      description: "Workout: Shoulder day",
      urgency: "low",
      dueDate: "02/01/2023",
    },
    {
      id: 3,
      taskName: "Walk",
      description: "Take 10,000 steps per day",
      urgency: "HIGH!!!!",
      dueDate: "02/10/2023",
    },
    {
      id: 4,
      taskName: "Water",
      description: "Drink a Gallon of water",
      urgency: "low",
      dueDate: "01/11/2023",
    },
  ]);

  const visibleTasks = selectedUrgency
    ? tasks.filter((e) => e.urgency === selectedUrgency)
    : tasks;

  const handleEdit = (id: number, editedTask: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? editedTask : task))
    );
  };

  return (
    <div>
      <div className="mb-4">
        <TaskForm
          onSubmit={(task) =>
            setTasks([...tasks, { ...task, id: tasks.length + 1 }])
          }
        />
      </div>
      <div className="mb-4">
        <TaskUrgency
          onSelectUrgency={(urgency) => setSelectedUrgency(urgency)}
        />
      </div>
      <TaskList
        tasks={visibleTasks}
        onDelete={(id) => setTasks(tasks.filter((e) => e.id !== id))}
        onEdit={(id, editedTask) => handleEdit(id, editedTask)}
      />
    </div>
  );
}

export default App;
