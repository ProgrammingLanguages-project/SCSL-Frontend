import { useState } from 'react';
import { Handle, Position, useStoreApi } from 'reactflow';
import Element from './elements/Element';
import axios from 'axios';

function MainComponent({ data, isConnectable }) {
  const [elements, setElements] = useState([]);
  const [component, setComponent] = useState({NAME: [], PROPS: [], FUNCTIONS: [], STYLES: [], RENDER: ['element_div{}']});

  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2');
  const functionsNode = nodeInternals.get('node-3');
  const appearanceNode = nodeInternals.get('node-4');

  const variablesValues = variablesNode?.data?.variableValues || [];
  const functionValues = functionsNode?.data?.functionValues || [];
  const appearanceValue = appearanceNode?.data?.appearanceValue || [];

  const props = Object.keys(variablesValues).map((key) => `prop_${variablesValues[key].variable} = ${variablesValues[key].value}`);
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

  const upload = async() => {
    const stringComponent = JSON.stringify(component);
    // Se debe eliminar las comillas dobles existentes en el string
    const resultado = stringComponent.replace(/"/g, "").replace(/°/g, '"').replace(/],/g, ']');
    await axios.post('http://localhost:3000/translate', {"SCSL": resultado.slice(1, -1)})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className='main-component-node container rounded border p-0 width border-primary-subtle bg-primary-subtle border-primary-subtle text-primary-emphasis'>
      <Handle type="target" position={Position.Left} id='main-left' />
      <Handle type="target" position={Position.Right} id='main-right' />
      <div className='custom-node__header border-bottom'>
        <div className='input-group'>
          <span className='input-group-text text-primary-emphasis bg-primary-subtle'>Name: </span>
          <input
            type='text'
            className='form-control nodrag'
            placeholder='My Component'
            onChange={(e) => component.NAME = [`°${e.target.value}°`]}
          />
        </div>
      </div>
      <div className='custom-node__body p-2 container bg-body'>
        <div className='border rounded container'>
          {elements.map((element) => (
            <div key={element.id}>
              <Element id={element.id} onDelete={deleteElement} component={component} />
            </div>
          ))}
          <div className='text-end'>
            <button className='btn' onClick={addElement}>
              Add element
            </button>
          </div>
        </div>
      </div>
      <button className='btn' onClick={upload}>
        CREATE COMPONENT
      </button>
    </div>
  );
}

export default MainComponent;
