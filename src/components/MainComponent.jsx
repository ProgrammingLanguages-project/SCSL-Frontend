import { useState } from 'react';
import { Handle, Position, useStoreApi } from 'reactflow';
import Element from './elements/Element';

function MainComponent({ data, isConnectable }) {
  const [elements, setElements] = useState([]);
  const [component, setComponent] = useState({NAME: [], PROPS: [], FUNCTIONS: [], STYLES: [], RENDER: []});

  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2');
  const functionsNode = nodeInternals.get('node-3');
  const appearanceNode = nodeInternals.get('node-4');

  const variablesValues = variablesNode?.data?.variableValues || [];
  const functionValues = functionsNode?.data?.functionValues || [];
  const appearanceValue = appearanceNode?.data?.appearanceValue || [];

  const props = Object.keys(variablesValues).map((key) => `prop_${variablesValues[key].variable}`);
  component.PROPS = props;
  const functions = Object.keys(functionValues).map((key) => `function_${functionValues[key].variable}() {${functionValues[key].value}}`);
  component.FUNCTIONS = functions;
  component.STYLES = [appearanceValue];

  const addElement = () => {
    const newElement = {
      id: Date.now(),
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id) => {
    const newElements = elements.filter((element) => element.id !== id);
    setElements(newElements);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setComponent({ ...component, [name]: [value] });
  };

  return (
    <div className='main-component-node container rounded border p-0 width'>
      <Handle type="target" position={Position.Left} id='main-left' />
      <Handle type="target" position={Position.Right} id='main-right' />
      <div className='custom-node__header border-bottom'>
        <div className='input-group'>
          <span className='input-group-text'>Name: </span>
          <input
            type='text'
            className='form-control nodrag'
            placeholder='My Component'
            onChange={(e) => component.NAME = [e.target.value]}
          />
        </div>
      </div>
      <div className='custom-node__body p-2 container'>
        <div className='border rounded container'>
          {elements.map((element) => (
            <div key={element.id}>
              <Element id={element.id} onDelete={deleteElement} onChangeComponent={onChange} />
            </div>
          ))}
          <div className='text-end'>
            <button className='btn' onClick={addElement}>
              Add element
            </button>
          </div>
        </div>
      </div>
      <button className='btn' onClick={() => console.log(component)}>
        CREATE COMPONENT
      </button>
    </div>
  );
}

export default MainComponent;
