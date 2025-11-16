import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react"

type Priority = "urgente" | "moyenne" | "basse";
type Todo = {
  id: number;
  text: String;
  priority: Priority;
};

function App() {
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("urgente");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [selectTodo , setSelectTodo] = useState<Set<number>>(new Set())

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addtodo() {
    if (input.trim() == "") {
      return alert("Ajouter la tache");
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("urgente");
    console.log(newTodos);
  }
  let filteredTodo: Todo[] = [];

  if (filter === "Tous") {
    filteredTodo = todos;
  } else {
    filteredTodo = todos.filter((todo) => todo.priority === filter);
  }
  const urgentCount = todos.filter((t) => t.priority === "urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "basse").length;
  const allCount = todos.length;

  function deleteTodo(id:number){
    const newTodos = todos.filter((t)=> t.id !== id)
    setTodos(newTodos)
  }

  function toogleSelectedTodo(id:number){

    const newSelected = new Set(selectTodo)
    if(newSelected.has(id)){
      newSelected.delete(id)
    }else{
      newSelected.add(id)
    }
    setSelectTodo(newSelected)
  }

  function finishSelected(){
    const newTodo = todos.filter((t)=>{
      if(selectTodo.has(t.id)){
        return false
      }else{
        return true
      }
    })
    setTodos(newTodo)
    setSelectTodo(new Set)
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="flex bg-base-200 flex-col w-2/3 gap-4 my-15 rounded-lg shadow-lg p-5">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input w-full"
            placeholder="Ajoutez une tache..."
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="urgente">Urgente</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
          <button className="btn btn-primary ml-2" onClick={addtodo}>
            Ajouter
          </button>
        </div>
        <div className="flex-1 space-y-2 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
            <button
              className={`btn btn-soft ${
                filter === "Tous" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("Tous")}
            >
              Tous ({allCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "urgente" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("urgente")}
            >
              Urgente ({urgentCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "moyenne" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("moyenne")}
            >
              Moyenne ({mediumCount})
            </button>
            <button
              className={`btn btn-soft ${
                filter === "basse" ? "btn-primary" : ""
              }`}
              onClick={() => setFilter("basse")}
            >
              Basse ({lowCount})
            </button>
          </div>
          <button 
          onClick={finishSelected}
          disabled={selectTodo.size == 0}
          className="btn btn-primary">Finir la tache({selectTodo.size})</button>
          </div>
          
          {filteredTodo.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodo.map((todo) => (
                <li key={todo.id}>
                  <TodoItem 
                  todo={todo} 
                  isSelected={selectTodo.has(todo.id)}
                  ondelete={()=> deleteTodo(todo.id)}
                  ontoogleSelect ={toogleSelectedTodo}
                  
                   />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center p-5 flex-col">
              <div>
                <Construction strokeWidth={1} className="h-40 w-40"/>
              </div>
              <span className="text-sm ">Aucune tache pour ce filtre</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
