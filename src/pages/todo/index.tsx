import { Route, Routes } from "react-router-dom"
import TodoList from "./todo-list"
import NewTodo from "./new-todo"
import UpdateTodo from "./detail"

const Todo = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/create" element={<NewTodo />} />
            <Route path="/detail:id" element={<UpdateTodo />} />
        </Routes>
    )
}

export default Todo