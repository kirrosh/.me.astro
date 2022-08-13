import { counterSignal } from "./counterSignal";

export default function DisplayCounter() {
  const [count, setCount] = counterSignal;
  return (
    <div>
      <h1 class="text-red-500">{count()}</h1>
    </div>
  );
}
