import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import urgencies from "./urgency";


//code for Task Form


const schema = z.object({
  taskName: z
    .string()
    .min(3, { message: "Task Name must be at least 3 characters" })
    .max(50),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(250),
  urgency: z.enum(urgencies, {
    errorMap: () => ({ message: "Please use one of the drop down options" }),
  }),
  dueDate: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, { message: "Invalid date" }).transform((value) => new Date(value)),
});

const stringToDate = z.string().pipe(z.coerce.date());
type TaskFormData = {
  taskName: string;
  description: string;
  urgency: string;
  dueDate: string; 
};


interface Props {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.dueDate = data.dueDate.toString().split('T')[0];
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="taskName" className="form-label">
          Task Name
        </label>
        <input
          {...register("taskName")}
          id="taskName"
          type="text"
          className="b-2"
        />
        {errors.taskName && <p className="errors">{errors.taskName.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="b-2"
        />
        {errors.description && (
          <p className="errors">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="urgency" className="form-label">
          Urgency
        </label>
        <select {...register("urgency")} id="urgency" className="urgency-drp">
          <option value=""></option>
          {urgencies.map((urgency) => (
            <option key={urgency} value={urgency}>
              {urgency}
            </option>
          ))}
        </select>
        {errors.urgency && <p className="errors">{errors.urgency.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          {...register("dueDate")}
          id="dueDate"
          type="date"
          className="b-2"
        />

        {errors.dueDate && <p className="errors">{errors.dueDate.message}</p>}
      </div>
      <div className="mb-2">
        <button className="btn">Submit Task!</button>
      </div>
    </form>
  );
};

export default TaskForm;
