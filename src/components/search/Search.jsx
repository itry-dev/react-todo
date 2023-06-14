import TodoApiService from "../../services/TodoApiService";
import { useState } from "react";
import { useTodosDispatch } from "../../store/TodoProvider";
import { LIST_FETCHED, API_ERROR } from "../../store/dispatch_actions";

function Search(){
    const placeholderText = 'Search for a todo...'
    const dispatch = useTodosDispatch();
    const [searchTerm, setSearchTerm] = useState('')    

    const handleSearching = (e) => {
        setSearchTerm(e.target.value)

        if (e.target.value.length < 3) return
        
        new TodoApiService().search(e.target.value)
        .then((response) => {
            dispatch({type: LIST_FETCHED, payload: response})
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})
        })
    }

    const getAll = () => {
        setSearchTerm('')

        new TodoApiService().getAll()
        .then((response) => {
            dispatch({type: LIST_FETCHED, payload: response})
        })
        .catch((error) => {
            dispatch({type: API_ERROR, payload: error})
        });
    }

    return (
        <div className="row mt-4">
           <h4>Search todo</h4>
            <div className="col-10">
                <input type="text"
                placeholder={placeholderText}
                value={searchTerm}
                name="search" 
                className="form-control"
                onChange={handleSearching} />                
            </div>
            <div className="col-2">
                <a href="#" className="btn btn-link" onClick={getAll}>X</a>
            </div>
        </div>
    )
}

export default Search;