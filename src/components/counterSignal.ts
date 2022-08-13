import { createSignal } from "solid-js";

export const counterSignal = createSignal(0);
const [count, setCount] = counterSignal;
export const increment = () => setCount(count() + 1);
export const decrement = () => setCount(count() - 1);
