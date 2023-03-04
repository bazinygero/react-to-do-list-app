import React, { useState, useLayoutEffect, createContext, useMemo } from 'react'

import AddTodo from './Components/AddTodo'
import Attribution from './Components/Attribution'
import Header from './Components/Header'
import TodoOptions from './Components/TodoOptions'
import TodosArea from './Components/TodosArea'

import './Styles/base/main.scss'

export const HeaderContext = createContext(null)
export const TodoListContext = createContext(null)
export const ViewContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("dark")
  const [todoList, setTodoList] = useState([])
  const [view, setView] = useState("all")
  const themeItems = useMemo(() => ({ theme, setTheme }), [theme])
  const todoItems = useMemo(() => ({ todoList, setTodoList }), [todoList])
  const viewItems = useMemo(() => ({ view, setView }), [view])

  useLayoutEffect(() => {
    if (localStorage.theme) {
      setTheme(localStorage.theme)
    } else {
      localStorage.theme = theme
    }
  }, [])
  
  return(
    <div id='appContainer' className={theme}>
      <div id='app'>
        <HeaderContext.Provider value={themeItems}>
          <Header />
        </HeaderContext.Provider>
        <TodoListContext.Provider value={todoItems}>
          <AddTodo />
          <ViewContext.Provider value={viewItems}>
            <div id='todosContainer'>
              <TodosArea />
              <TodoOptions />
            </div>
          </ViewContext.Provider>
        </TodoListContext.Provider>
        <p id='note'>Drag and drop to reorder list</p>
      </div>
      <Attribution />
    </div>
  )
}

export default App