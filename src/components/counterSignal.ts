import { createRoot } from "solid-js";
import { createCoolieStore } from "../lib/createCookieStore";

type ITodosStore = {
  todos: { text: string; completed: boolean }[];
};

function createCounter() {
  const proxStore = createCoolieStore<ITodosStore>(
    { todos: [] },
    { name: "todos" }
  );
  const [store, setStore] = proxStore;
  const addTodo = (text: string) => {
    setStore("todos", (todos) => [...todos, { text, completed: false }]);
  };
  return { store, setStore, addTodo };
}

export const rootCounter = createRoot(createCounter);
