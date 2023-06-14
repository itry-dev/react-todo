import { createContext, useContext, useReducer } from "react";
import reducer,{ initialState } from "./TodoReducer";

export const TodoContext = createContext(null);
export const TodoDispatchContext = createContext(null);


export function useTodos() {
    return useContext(TodoContext);
}
  
export function useTodosDispatch() {
    return useContext(TodoDispatchContext);
}

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TodoContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}


