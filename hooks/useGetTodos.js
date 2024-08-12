import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import apiFetch from "../functions/apiFetch";
import { clearTodoAlerts, setTodoList, updateTodoError } from "../actions/todo";

export const useGetTodos = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    dispatch(clearTodoAlerts());
    try {
      const response = await apiFetch("/todo", {
        method: "GET",
      });
      if (response.status === 200) {
        dispatch(setTodoList({ items: response.body }));
      } else if (response.body?.error) {
        dispatch(updateTodoError({ error: response.body.error }));
      }
    } catch (error) {
      dispatch(updateTodoError({ error: "Unknown Error! Please try later" }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return [isLoading, loadTodos];
};
