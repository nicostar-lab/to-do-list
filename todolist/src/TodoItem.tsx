import {Trash} from "lucide-react"

type Priority = "urgente" | "moyenne" | "basse";
type Todo = {
  id: number;
  text: String;
  priority: Priority;
};
type Props = {
  todo: Todo;
  ondelete:() => void
  isSelected: boolean
  ontoogleSelect: (id: number)=>void
};
const TodoItem = ({ todo, ondelete,isSelected, ontoogleSelect }: Props) => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            className="checkbox checkbox-primary checkbox-sm"
            onChange={()=>ontoogleSelect(todo.id)}
          />
          <span className="text-md font-bold">
            <span>{todo.text}</span>
          </span>
          <span
            className={`badge badge-sm badge-soft ${
              todo.priority === "urgente"
                ? "badge-error"
                : todo.priority === "moyenne"
                ? "badge-warning"
                : "badge-success"
            }`}
          >
            {todo.priority}
          </span>
        </div>
        <button 
        className="btn btn-error btn-soft btn-sm"
        onClick={ondelete}
        >
           <Trash className="w-4 h-4 "/>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
