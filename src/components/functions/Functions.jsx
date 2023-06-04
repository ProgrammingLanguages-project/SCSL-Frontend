import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Function } from './Function';

export function Functions({ data, isConnectable }) {
  const [functions, setFunctions] = useState([]);
  const [functionValues, setFunctionValues] = useState({});

  const addFunctionValue = (id, FunctionValue) => {
    setFunctionValues({ ...functionValues, [id]: FunctionValue });
    data.functionValues = functionValues;
  };

  const addFunction = () => {
    const newFunction = {
      id: Date.now(),
    };
    setFunctions([...functions, newFunction]);
  };

  const deleteFunction = (id) => {
    const newFunctions = functions.filter((fun) => fun.id !== id);
    setFunctions(newFunctions);

    delete functionValues[id];
    data.functionValues = functionValues;
  };

  return (
    <div className='main-component-node container rounded border p-0 width'>
      <Handle type="source" position={Position.Right} id='functions' />
      <div className='custom-node__header border-bottom'>
        <div className='h5'>Functions</div>
      </div>
      <div className='custom-node__body p-2 container'>
        <div className='border rounded container'>
          {functions.map((fun) => (
            <div key={fun.id}>
              <Function
                id={fun.id}
                onDelete={deleteFunction}
                addFunctionValue={addFunctionValue}
              />
            </div>
          ))}
          <div className='text-end'>
            <button className='btn' onClick={addFunction}>
              Add function
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
