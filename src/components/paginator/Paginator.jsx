import { useState } from "react";
import { useTodos, useTodosDispatch } from "../../store/TodoProvider";
import { SET_CURRENT_PAGE } from "../../store/dispatch_actions";

function Paginator(){

    const dispatch = useTodosDispatch();
    const todosState = useTodos()

    const START_PAGE = 1

    const handlePageClick = (e) => {
        var page = Number(e.target.id)
        if (isNaN(page)) page = START_PAGE
        dispatch({type: SET_CURRENT_PAGE, payload: page})
    }

    const ButtonList = () => {
        if (todosState.totalPages === 1) return null
        var buttons = []
        for(var i=0; i<todosState.totalPages;i++){
            if (i+1 === todosState.currentPage) {
                buttons.push (
                    <li className="page-item" key={i}>
                        <a className="page-link" href="#">{i+1}</a>
                    </li>
                )
            }else{                
                buttons.push (
                    <li className="page-item active" key={i}>
                        <a 
                        href="#"
                        id={i+1}                         
                        className="page-link"
                        onClick={handlePageClick}>
                            {i+1}
                        </a>
                    </li>
                )
            }            
        }

        return buttons
    }
    

    return (
        <div className="row">
            <div className="col-12">
                <nav aria-label="Page navigation" className="mt-3">
                    <span>Todos count: {todosState.totalRows}</span>
                    <ul className="pagination mt-2">
                        <ButtonList />
                    </ul>
                </nav>
            </div>
        </div>
    )

}

export default Paginator