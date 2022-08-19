import { createSignal, createRoot } from "solid-js";
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

export const counterSignal = createSignal(0);
const [count, setCount] = counterSignal;
export const increment = () => setCount(count() + 1);
export const decrement = () => setCount(count() - 1);
