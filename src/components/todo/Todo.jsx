import TodoApiService from "../../services/TodoApiService";
import { useTodosDispatch,useTodos } from "../../store/TodoProvider";
import { useState } from "react";   
import { EDIT, DELETE, HIDE_POSITIVE_FEEDBACK, API_ERROR, LIST_FETCHED, LOADING } from "../../store/dispatch_actions";

function Todo({todo}){
    
    const todosState = useTodos()
    const dispatch = useTodosDispatch();
    const [isEditingLocalState, setLocalEditState] = useState(false);


    function deleteTodo() {
        if (!window.confirm('Are you sure?')) return;

        new TodoApiService().delete(todo.id)
        .then((response) => {
            dispatch({type: DELETE, payload: todo})
            setLocalEditState(false);
            
            showPositiveFeedback()

            fetchTodo()
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})
        })  
    }

    function showPositiveFeedback() {
        setTimeout(() => dispatch({type: HIDE_POSITIVE_FEEDBACK}), 1000)
    }

    function editTodo() {
        new TodoApiService().edit(todo)
        .then((response) => {
            dispatch({type: EDIT, payload: todo})
            setLocalEditState(false);

            showPositiveFeedback()

            if (todo.completed) {
                fetchTodo()
            }
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

    function SaveButton() {
        if (!isEditingLocalState) return null;

        return (
            <button type="button" id={todo.id} className="btn btn-primary me-2"
            onClick={editTodo}>
                Save
            </button>
        )
    }

    function EditButton() {
        if (todo.completed) return null;
        if (isEditingLocalState) return null;

        return (
            <button type="button" id={todo.id} className="btn btn-secondary me-2"
            onClick={() => setLocalEditState(true)}>
                Edit
            </button>
        )
    }

    function DeleteButton(){
        if (isEditingLocalState) return null;
        
        return (
            <button type="button" id={todo.id} className="btn btn-danger"
            onClick={deleteTodo}>
                Delete
            </button>
        )
    }

    function CancelButton(){
        if (!isEditingLocalState) return null;
        return (
            <button type="button" id={todo.id} className="btn btn-dark"
            onClick={() => setLocalEditState(false)}>
                Cancel
            </button>
        )
    }

    function handleTodoCompleted() {
        todo.completed = !todo.completed;
    }

    function handleTitleChange(e){
        todo.title = e.target.value;
    }

    function TodoItem() {
        if (isEditingLocalState){
            return (
                <div className="row mb-2">
                    <div className="col-11">
                        <input 
                            type="text" 
                            className="form-control"
                            defaultValue={todo.title}
                            onChange={handleTitleChange} />
                    </div>
                    <div className="col-1">
                        <input 
                            type="checkbox"
                            className="form-check-input big"
                            aria-label="..."
                            id={todo.id} 
                            defaultChecked={todo.completed}
                            onChange={handleTodoCompleted} />
                    </div>
                    
                </div>
            )
        }

        return (
            <label className="form-control mb-2" htmlFor={todo.id}>
                {todo.title} {todo.completed ? "✔" : ""}
            </label>
        )
    }


    return (
        <>
            <TodoItem />
            <EditButton />
            <SaveButton />
            <DeleteButton />
            <CancelButton />
        </>

    )
}

export default Todo;