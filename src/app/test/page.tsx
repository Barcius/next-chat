'use client'
import React from 'react';
import useStore from '../../store/store';

const TestZustand: React.FC = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  console.log('render');

  return (
    <div>
      <h1>Zustand Test</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default TestZustand;

