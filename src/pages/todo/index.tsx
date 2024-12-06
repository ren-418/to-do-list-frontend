import { Route, Routes } from "react-router-dom"
import TodoList from "./todo-list"
import NewTodo from "./new-todo"
import UpdateTodo from "./update-todo"
import ViewTodo from "./view-todo"

const Todo = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/create" element={<NewTodo />} />
            <Route path="/update:id" element={<UpdateTodo />} />
            <Route path="/view:id" element={<ViewTodo />} />
        </Routes>
    )
}

export default Todo