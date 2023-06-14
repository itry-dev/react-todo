import { useTodos } from "../../store/TodoProvider";

export default function Loader() {
    const todosState = useTodos()

    if (!todosState.loading) return null

    return (
        <div className="progress">
            <div className="progress-bar bg-warning" role="progressbar" aria-label="Basic example" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}
