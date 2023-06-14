import { useTodos,useTodosDispatch } from "../../store/TodoProvider";
import { FILTERING } from "../../store/dispatch_actions";

export default function FilterButton() {  


  const todosState = useTodos()
  const dispatch = useTodosDispatch();

  const onFilterTodoChanged = (e) => {
    const value = e.target.value
    dispatch({type: FILTERING, payload: value})
  }

  return (
    <div className="row mt-3 mb-3">
      <h4>Filter data by</h4>
      <div className="col">
        <select 
          name="filter"
          className="form-select form-select-lg" 
          aria-label="filter todo status"
          onChange={onFilterTodoChanged}
          defaultValue={todosState.filterBy}>
          <option value="">Select one</option>
          <option value={process.env.REACT_APP_FILTER_BY_COMPLETED_TODO_VALUE}>Completed</option>
          <option value={process.env.REACT_APP_FILTER_BY_NOT_COMPLETED_TODO_VALUE}>To do</option>
        </select>
      </div> 
    </div>
  );
}
