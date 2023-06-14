import { ADD, EDIT, DELETE, LIST_FETCHED, LIST_FETCHED_COMPLETED, LIST_FETCHED_NOT_COMPLETED, API_ERROR, LOADING, FILTERING, HIDE_POSITIVE_FEEDBACK, SET_CURRENT_PAGE } from "./dispatch_actions";


export const initialState = {
    todos: [],
    totalRows: 0,
    totalPages: 0,
    error: null,
    positiveFeedback: null,
    loading: false,
    filterBy: '',
    currentPage: 1
};

const reducer = (state, action) => {

    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case HIDE_POSITIVE_FEEDBACK:
            return {
                ...state,
                positiveFeedback: null
            }
        case FILTERING:
            return {
                ...state,
                filterBy: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case ADD:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                error: null,
                loading: false,
                positiveFeedback: 'Todo added successfully'
            }
        case DELETE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id),
                error: null,
                totalRows: state.totalRows - 1,
                loading: false,
                positiveFeedback: 'Todo deleted successfully'
            }
        case EDIT:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo),
                error: null,
                loading: false,
                positiveFeedback: 'Todo updated successfully'
            }
        case LIST_FETCHED:
        case LIST_FETCHED_COMPLETED:
        case LIST_FETCHED_NOT_COMPLETED:
            return {
                ...state,
                todos: action.payload.rows,
                totalRows: typeof action.payload.totalRows !== 'undefined' ? action.payload.totalRows : 0,
                totalPages: typeof action.payload.totalPages !== 'undefined' ? action.payload.totalPages : 0,
                error: null,
                loading: false,
                positiveFeedback: null
            }
        case API_ERROR:
            return {
                ...state,
                error: action.payload.message,
                loading: false,
                positiveFeedback: null
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export default reducer;