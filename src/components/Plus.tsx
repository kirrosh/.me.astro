import { increment } from "./counterSignal";

export default function Plus() {
  return (
    <div>
      <div class="flex gap-4">
        <button class="p-4 bg-gray-500" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}
