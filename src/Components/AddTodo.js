import React, { useState, useContext, useEffect } from 'react'
import { TodoListContext } from '../App'

import s from '../Styles/components/addTodos.module.scss'

function AddTodo() {

    const { todoList, setTodoList } = useContext(TodoListContext)
    const [todo, setTodo] = useState("")
    const [nextId, setNextId] = useState(7)
    const todoInput = (e) => {
        setTodo(e.target.value)
    }

    useEffect(() => {
        if (localStorage.nextId) {
            setNextId(+localStorage.nextId)
        } else {
            localStorage.setItem("nextId", nextId)
        }
    }, [])

    const addTodoItem = () => {
        if (todo !== "") {
            const newList = [...todoList, { name: todo, checked: false, id: nextId }]
            const newId = nextId + 1
            setTodoList(newList)
            setTodo("")
            setNextId(newId)
            localStorage.nextId = newId
            localStorage.todoList = JSON.stringify(newList)
        }
    }
    
    const EnterKey = (e) => {
        if (e.key === "Enter") {
            addTodoItem()
        }
    }

    return(
        <div id={s.addTodo}>
            <button id={s.createTodo} onClick={addTodoItem} />
            <input 
                type='text'
                name='todoInput'
                id={s.todoInput}
                placeholder='Create a new todo...'
                value={todo}
                onChange={todoInput}
                onKeyDown={EnterKey}
            />
        </div>
    )
}

export default AddTodo