import React, { useContext } from 'react'
import { TodoListContext } from '../App'

import s from "../Styles/components/todosArea.module.scss"

function TodoItem({ name }) {

    const { todoList, setTodoList } = useContext(TodoListContext)
        
    const checkTodo = (e) => {
        const newList = todoList.map((todo) => {
            if (+e.target.parentElement.parentElement.id === todo.id) {
                return { name: todo.name, checked: !todo.checked, id: todo.id}
            }
            return todo
        })
        setTodoList(newList)
        localStorage.todoList = JSON.stringify(newList)
    }

    const deleteTodo = (e) => {
        const newList = todoList.filter(
            (todo) => +e.target.parentElement.id !== todo.id
        )
        setTodoList(newList)
        localStorage.todoList = JSON.stringify(newList)
    }
    return(
        <>
            <p role='presentation' className={s.todoTitle} onClick={checkTodo}>
                <button className={s.checkTodo} />
                <span className={s.todoText}>{name}</span>
            </p>
            <button className={s.deleteTodo} onClick={deleteTodo} />
        </>
    )
}

export default TodoItem