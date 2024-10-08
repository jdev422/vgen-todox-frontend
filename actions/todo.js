// TODO/UPDATE-NAME
export const updateTodoName = ({name = ""}) => ({
    type: 'TODO/UPDATE-NAME',
    name
});

// TODO/CLEAR
export const clearTodo = () => ({
    type: 'TODO/CLEAR'
});

// TODO/CLEAR-BODY
export const clearTodoBody = () => ({
    type: 'TODO/CLEAR-BODY'
});

// TODO/ERROR
export const updateTodoError = ({error = ""}) => ({
    type: 'TODO/ERROR',
    error
});

// TODO/ERROR
export const updateTodoSuccess = ({success = ""}) => ({
    type: 'TODO/SUCCESS',
    success
});

// TODO/CLEAR-ALERTS
export const clearTodoAlerts = () => ({
    type: 'TODO/CLEAR-ALERTS'
});

// TODO/SET-LIST
export const setTodoList = ({ items = [] }) => ({
    type: "TODO/SET-LIST",
    items,
});

// TODO/REPLACE-TODO-ITEM"
export const replaceTodoItem = (item) => ({
    type: "TODO/REPLACE-TODO-ITEM",
    item,
})