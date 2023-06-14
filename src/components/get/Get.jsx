import Todo from "../todo/Todo";
import TodoApiService from "../../services/TodoApiService";
import { useEffect, useState } from "react";
import { useTodos,useTodosDispatch } from "../../store/TodoProvider";
import { LIST_FETCHED, API_ERROR, LOADING } from "../../store/dispatch_actions";
import Filters from '../filters/Filters';
import Paginator from '../paginator/Paginator';

function Get() {

    const todosState = useTodos()
    const dispatch = useTodosDispatch();

    let isCompletedOnly = todosState.filterBy === process.env.REACT_APP_FILTER_BY_COMPLETED_TODO_VALUE

    useEffect(() => {
        fetchTodos()
      }, [
        todosState.currentPage, 
        isCompletedOnly]
    )

    
    const fetchTodos = () => { 

        dispatch({type: LOADING, payload: true})

        new TodoApiService().getAll(todosState.currentPage, isCompletedOnly)
        .then((response) => {
            dispatch({type: LIST_FETCHED, payload: response})
            dispatch({type: LOADING, payload: false})
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})          
        })
    }
    

    const ListItems = () => {
        return todosState.todos.map((todo) => {
            return (
                <li className="list-group-item border-0 ms-0 ps-0" key={todo.id}>
                    <Todo key={todo.id} todo={todo} />
                </li>
            )
        })
    }
    

    const RenderFilters = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="filters btn-group stack-exception">
                    <Filters />
                    </div>
                </div>
            </div>            
        )
    }

    const RenderResult = () => {
        return (
            <>
                <RenderFilters />

                <div className="row">
                    <div className="col-12">
                        <ul className="list-group list-group-flush">
                            <ListItems />
                        </ul>
                    </div>
                </div>
        
                <Paginator />
            </>
        )
    }

    const RenderEmptyResult = () => {
        return (
            <>
                <RenderFilters />
                <div className="row">
                    <div className="col-12">
                        <span className="fw-bold">No results</span>
                    </div>
                </div>            
            </>
        )
    }

  return (
    <>
        {todosState.todos !== null && todosState.todos.length > 0 ? <RenderResult /> : <RenderEmptyResult />}        
    </>
  )


}

export default Get