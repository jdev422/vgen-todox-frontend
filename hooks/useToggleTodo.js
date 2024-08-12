import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import apiFetch from "../functions/apiFetch";
import {
  clearTodoAlerts,
  updateTodoError,
  updateTodoSuccess,
  replaceTodoItem,
} from "../actions/todo";

export const useToggleTodo = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const toggleTodo = useCallback(async (item) => {
    setIsPending(true);
    dispatch(clearTodoAlerts());

    try {
      const response = await apiFetch(`/todo/toggle-status`, {
        method: "PUT",
        body: { todoID: item._id },
      });

      if (response.status === 200) {
        dispatch(
          updateTodoSuccess({ success: `Updated "${item.name}" successfully` })
        );
        dispatch(replaceTodoItem(response.body));
      } else if (response.body?.error) {
        dispatch(updateTodoError({ error: response.body.error }));
      }
    } catch (error) {
      dispatch(updateTodoError({ error: "Unknown Error! Please try later" }));
    } finally {
      setIsPending(false);
    }
  }, []);

  return [isPending, toggleTodo];
};
