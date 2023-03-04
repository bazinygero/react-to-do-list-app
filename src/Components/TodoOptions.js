import React, { useContext, useEffect, useRef } from 'react'
import { TodoListContext, ViewContext } from '../App'

import s from "../Styles/components/todoOptions.module.scss"

function TodoOptions() {

    const { todoList, setTodoList } = useContext(TodoListContext)
    const { view, setView } = useContext(ViewContext)
    const countRef = useRef(null)
    const changeFilter =  (e) => {
        if (e.target.dataset.filter === 'all') {
            setView('all')
        } else if (e.target.dataset.filter === 'active') {
            setView('active')
        } else if (e.target.dataset.filter === 'completed') {
            setView('completed')
        }
        e.target.classList.add(s.active) 
    }

    const clearCompleted = () => {
        const newList = todoList.filter((todo) => !todo.checked)
        setTodoList(newList)
        localStorage.todoList = JSON.stringify(newList)
    }

    useEffect(() => {
        const newList = todoList.filter((todo) => !todo.checked)
        countRef.current.textContent = newList.length
    }, [todoList])

    return(
        <footer id={s.todoOptions}>
            <p id={s.itemsLeft}>
                <span id={s.todoCount} ref={countRef} />
                items left
            </p>
            <ul id={s.todoFilters} data-filter={view}>
                <li
                    role="presentation"
                    className={`${s.filter} ${view === "all" ? s.active : ""}`}
                    onClick={changeFilter}
                    data-filter="all"
                    >
                    All
                </li>
                <li
                    role="presentation"
                    className={`${s.filter} ${view === "active" ? s.active : ""}`}
                    onClick={changeFilter}
                    data-filter="active"
                    >
                    Active
                </li>
                <li
                    role="presentation"
                    className={`${s.filter} ${view === "completed" ? s.active : ""}`}
                    onClick={changeFilter}
                    data-filter="completed"
                    >
                    Completed
                </li>
            </ul>
            <button id={s.clearComp} onClick={clearCompleted}>
                Clear Completed
            </button>
        </footer>
    )
}

export default TodoOptions