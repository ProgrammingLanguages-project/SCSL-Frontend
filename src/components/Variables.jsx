import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import Variable from './Variable';
import { ReactFlowProvider } from 'reactflow';

function Variables({ data, isConnectable }) {
  const [variables, setVariables] = useState([]);
  const [variableValues, setVariableValues] = useState({});

  const addVariableValue = (id, VariableValue) => {
    setVariableValues({ ...variableValues, [id]: VariableValue });
    //console.log(variableValues);
    data.variableValues = variableValues;
    //console.log(data);
  };

  const addVariable = () => {
    const newVariable = {
      id: Date.now(),
    };
    setVariables([...variables, newVariable]);
  };

  const deleteVariable = (id) => {
    const newVariables = variables.filter((variable) => variable.id !== id);
    setVariables(newVariables);
    // Se elimina el objeto con id del objeto variableValues
    delete variableValues[id];
    data.variableValues = variableValues;
    console.log(variableValues);
  };

  return (
    <div className='main-component-node container rounded border p-0 width bg-success-subtle border-success-subtle'>
      <Handle type="source" position={Position.Right} id='variables' />
      <div className='custom-node__header border-bottom'>
        <div className='h5'>Variables</div>
      </div>
      <div className='custom-node__body p-2 container bg-body'>
        <div className='border rounded container'>
          {variables.map((variable) => (
            <div key={variable.id}>
              <Variable
                id={variable.id}
                onDelete={deleteVariable}
                addVariableValue={addVariableValue}
              />
            </div>
          ))}
          <div className='text-end'>
            <button className='btn border-success-subtle  ' onClick={addVariable}>
              Add variable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Variables;
