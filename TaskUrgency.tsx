import React from "react";
import urgencies from "./urgency";


//Code for selectingg urgencies
interface Props {
  onSelectUrgency: (urgency: string) => void;
}

const TaskUrgency = ({ onSelectUrgency }: Props) => {
  return (
    <select
      className="Urgencies"
      onChange={(event) => onSelectUrgency(event.target.value)}
    >
      <option value="">All Urgencies</option>
      {urgencies.map(urgency =><option key={urgency} value={urgency}>{urgency}</option>)}
    </select>
  );
};

export default TaskUrgency;
