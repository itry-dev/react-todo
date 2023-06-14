import { useTodos } from "../../store/TodoProvider";

export default function Feedback() {
    const todosState = useTodos()

    if (todosState.error === null && todosState.positiveFeedback === null) return null

    if (todosState.positiveFeedback !== null){
        return (
            <div className="alert alert-success" role="alert" id="_alert_ok">
                {todosState.positiveFeedback}
            </div>
        )
    }else{
        return (
            <div className="alert alert-danger" role="alert" id="_alert_ko">
                {todosState.error}
            </div>
        )
    }
}
