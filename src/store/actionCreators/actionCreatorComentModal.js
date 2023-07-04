import store from "../store";

export const openCommentForm = (payload) => {
    store.dispatch({type:'OPEN_COMMENT_FORM', payload})
}
export const closeCommentForm = () => {
    store.dispatch({type:'CLOSE_COMMENT_FORM'})
}
export const fillCommentForm = (payload) => {
    store.dispatch({type:'FILL_COMMENT_FORM', payload})
}
