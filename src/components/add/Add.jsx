import { useState } from "react";
import TodoApiService from "../../services/TodoApiService";
import Todo from "../../models/Todo";
import { useTodosDispatch, useTodos } from "../../store/TodoProvider";
import { ADD, API_ERROR, HIDE_POSITIVE_FEEDBACK, LIST_FETCHED, LOADING } from "../../store/dispatch_actions";
   

export default function Add() {

    const [title, setTitle] = useState("");

    const todosState = useTodos()
    const dispatch = useTodosDispatch();

    function addTodo() {
        const newTodo = new Todo(title, false);

        new TodoApiService().add(newTodo)
        .then((response) => {
            dispatch({type: ADD, payload: newTodo})
            setTitle("");
            setTimeout(() => dispatch({type: HIDE_POSITIVE_FEEDBACK}), 1000)

            fetchTodo()
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})
        })      
       
    }

    function fetchTodo(){
        dispatch({type: LOADING, payload: true})
        
        new TodoApiService().getAll(
            todosState.currentPage, 
            todosState.filterBy === process.env.REACT_APP_FILTER_BY_COMPLETED_TODO_VALUE)
        .then((response) => {
            dispatch({type: LIST_FETCHED, payload: response})
            dispatch({type: LOADING, payload: false})
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})          
        })
    }

    function handleAddTodo(e) {
        if (title.length === 0) return;
        addTodo();
    }

    function handleChange(e) {
        setTitle(e.target.value);
    }

    return (
        <form className="row">
            <h2 className="form-label">
                What needs to be done?
            </h2>
            <div className="col-11">
                <input
                    type="text"
                    className="form-control"
                    name="text"
                    autoComplete="off"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className="col-1">
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddTodo}>
                    Add
                </button>
            </div>            
        </form>
    )
}