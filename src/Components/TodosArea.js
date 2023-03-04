import React, { useContext, useLayoutEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TodoListContext, ViewContext } from '../App'
import TodoItem from './TodoItem'

import s from "../Styles/components/todosArea.module.scss"

const todoPlaceholder = [
  { name: 'Complete Online JavaScript Course', checked: true, id: 1 },
  { name: 'Jog around the park 3x', checked: false, id: 2 },
  { name: '10 minutes meditation', checked: false, id: 3 },
  { name: 'Read for 1 hour', checked: false, id: 4 },
  { name: 'Pick up groceries', checked: false, id: 5 },
  { name: 'Complete Todo App Frontend Mentor challenge', checked: false, id: 6 },
]

function TodosArea() {

  const { todoList, setTodoList } = useContext(TodoListContext)
  const { view } = useContext(ViewContext)
  
  useLayoutEffect(() => {
    if (!localStorage.todoList) {
      setTodoList(todoPlaceholder)
      localStorage.setItem('todoList', JSON.stringify(todoPlaceholder))
    } else {
      setTodoList(JSON.parse(localStorage.todoList))
    }
  }, [])

  const handleDrag = (result) => {
    if (view === 'all') {
      const dragIndex = result.source.index
      const dropIndex = result.destination.index
      const itemsList = [...todoList]
      const [dragedItem] = itemsList.splice(dragIndex, 1)
      itemsList.splice(dropIndex, 0, dragedItem)
      setTodoList(itemsList)
      localStorage.todoList = JSON.stringify(itemsList)
    } else if (view === 'active') {
      let dragIndex = result.source.index
      let dropIndex = result.destination.index
      const filteredList = todoList.filter(({ checked }) => !checked)
      const itemsList = [...todoList]
      itemsList.forEach(({ id }, i) => {
        if (id === filteredList[result.source.index].id) {
          dragIndex = i
        }
        if (id === filteredList[result.destination.index].id) {
          dropIndex = i
        }
      })
      const [dragedItem] = itemsList.splice(dragIndex, 1)
      itemsList.splice(dropIndex, 0, dragedItem)
      setTodoList(itemsList)
      localStorage.todoList = JSON.stringify(itemsList)
    } else if (view === 'completed') {
      let dragIndex = result.source.index
      let dropIndex = result.destination.index
      const filteredList = todoList.filter(({ checked }) => checked)
      const itemsList = [...todoList]
      itemsList.forEach(({ id }, i) => {
        if (id === filteredList[result.source.index].id) {
          dragIndex = i
        }
        if (id === filteredList[result.destination.index].id) {
          dropIndex = i
        }
      })
      const [dragedItem] = itemsList.splice(dragIndex, 1)
      itemsList.splice(dropIndex, 0, dragedItem)
      setTodoList(itemsList)
      localStorage.todoList = JSON.stringify(itemsList)
    }
  }

  if (view === 'all') {
    return (
      <section id={s.todosArea}>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId='droppableTodos'>
            {(provided) => (
              <ul
                id={s.todoList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoList.map((todo, i) =>(
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={i}
                    type='TASK'
                  >
                    {(provided) => (
                      <li
                        id={todo.id}
                        className={s.todoItem}
                        data-checked={todo.checked}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem name={todo.name} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    )
  }

  if (view === 'active') {
    return (
      <section id={s.todosArea}>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="droppableTodos">
            {(provided) => (
              <ul
                id={s.todoList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoList
                  .filter((todo) => !todo.checked)
                  .map((todo, i) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={i}
                      type="TASK"
                    >
                      {(provided) => (
                        <li
                          id={todo.id}
                          className={s.todoItem}
                          data-checked={todo.checked}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem name={todo.name} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    )
  }

  if (view === 'completed') {
    return (
      <section id={s.todosArea}>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="droppableTodos">
            {(provided) => (
              <ul
                id={s.todoList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoList
                  .filter((todo) => todo.checked)
                  .map((todo, i) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={i}
                      type="TASK"
                    >
                      {(provided) => (
                        <li
                          id={todo.id}
                          className={s.todoItem}
                          data-checked={todo.checked}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem name={todo.name} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    )
  }
}

export default TodosArea