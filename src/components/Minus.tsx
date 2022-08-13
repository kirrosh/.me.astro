import { decrement } from "./counterSignal";

export default function Minus() {
  return (
    <div>
      <div class="flex gap-4">
        <button class="p-4 bg-gray-500" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}
