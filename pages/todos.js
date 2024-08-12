import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import { Colours } from "../definitions";
import PageLayout from "../components/PageLayout";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { clearTodoAlerts } from "../actions/todo";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { useGetTodos } from "../hooks/useGetTodos";

const Todo = () => {
  const dispatch = useDispatch();
  const [isLoading, loadTodo] = useGetTodos(false);
  const [isPending, toggleTodo] = useToggleTodo();
  const todoState = useSelector((state) => state.todo);

  useEffect(() => {
    loadTodo();
  }, [loadTodo]);

  return (
    <PageLayout title="Todo List">
      <Container>
        {isLoading ? <p>loading...</p> : null}

        <Alert
          message={todoState.alerts.error}
          onClose={() => dispatch(clearTodoAlerts())}
        />
        <Alert
          message={todoState.alerts.success}
          onClose={() => dispatch(clearTodoAlerts())}
          variant="success"
        />

        {todoState.body.items.map((item) => (
          <div key={item._id} className="todoCard">
            <span className={item.completed ? "completed" : "in-progress"}>
              {item.name}
            </span>
            <Button
              text={item.completed ? "Not Done" : "Done"}
              variant="neutral-light"
              onClick={() => toggleTodo(item)}
              disabled={isPending}
            />
          </div>
        ))}

        {!isLoading && todoState.body.items.length < 1 ? (
          <p>
            No tasks available. Enjoy your free time or{" "}
            <Link className="highlightedLink" href="/create">
              add a new task.
            </Link>
          </p>
        ) : null}
      </Container>
    </PageLayout>
  );
};

export default Todo;

const Container = styled.div`
  width: 100%;

  .todoCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    box-shadow: 0 1px 3px 0 ${Colours.BLACK_LIGHTEST_00},
      0 1px 2px -1px ${Colours.BLACK_LIGHTEST_1};
    border-radius: 0.25rem;

    .completed {
      text-decoration: line-through;
    }
  }

  .todoCard + .todoCard {
    margin-top: 0.75rem;
  }
`;
