import { decrement, rootCounter } from "./counterSignal";

export default function Minus() {
  const { store, addTodo } = rootCounter;
  return (
    <div>
      <div class="flex gap-4">
        <button class="p-4 bg-gray-500" onClick={decrement}>
          -
        </button>
        <button class="p-4 bg-gray-500" onClick={[addTodo, "sd"]}>
          Add
        </button>
      </div>
    </div>
  );
}
