import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { decrement, increment, incrementByAmount } from "@/store/counter-slice";
import type { RootState } from "@/store/types";
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector<RootState, number>((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Card className="p-5">
      <h2>Counter</h2>
      <h3>Count: {count}</h3>
      <div className="flex justify-center gap-2">
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
      </div>
    </Card>
  );
}

export default Counter;
