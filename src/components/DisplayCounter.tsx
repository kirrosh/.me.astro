import { counterSignal, rootCounter } from "./counterSignal";

export default function DisplayCounter() {
  const [count, setCount] = counterSignal;
  const { store, setStore } = rootCounter;
  return (
    <div>
      <h1 class="text-red-500">{count()}</h1>
      <h1 class="text-green-500">{store.todos?.length}</h1>
    </div>
  );
}
