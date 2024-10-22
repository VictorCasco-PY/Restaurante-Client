import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className="btn btn-primary" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        className="btn btn-info"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Increment by 5
      </button>
    </div>
  );
};

export default Counter;
