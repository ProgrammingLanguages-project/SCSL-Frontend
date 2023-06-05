import { useState } from 'react';
import { Handle, Position, useStoreApi } from 'reactflow';
import Element from './elements/Element';
import axios from 'axios';
import { Translation } from './Translation';

function calculateRender(parent) {
  const render = calculateElement(parent);
  return render;
}

function calculateElements(elements) {
  const content = [];
  for (const element of elements) {
    content.push(calculateElement(element));
  }
  return content;
}

function calculateElement({ element_type, subElements, props }) {
  let content;
  if (subElements.length) {
    content = calculateElements(subElements);
  }

  return {
    [element_type]: {
      content,
      ...props,
    },
  };
}

// eslint-disable-next-line react/prop-types
function MainComponent() {
  const [translation, setTranslation] = useState('');
  const [component, setComponent] = useState({
    NAME: [],
    PROPS: [],
    FUNCTIONS: [],
    STYLES: [],
  });

  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2');
  const functionsNode = nodeInternals.get('node-3');
  const appearanceNode = nodeInternals.get('node-4');

  const variablesValues = variablesNode?.data?.variableValues || [];
  const functionValues = functionsNode?.data?.functionValues || [];
  const appearanceValue = appearanceNode?.data?.appearanceValue || "";

  const props = Object.keys(variablesValues).map(
    (key) =>
      `prop_${variablesValues[key].variable} = ${variablesValues[key].value}`
  );
  component.PROPS = props;
  const functions = Object.keys(functionValues).map(
    (key) =>
      `function_${functionValues[key].variable}() {${functionValues[key].value}}`
  );
  component.FUNCTIONS = functions;
  component.STYLES = [appearanceValue];

  const [parent, setParent] = useState({ id: 'parent-element' });

  const onParentChange = (newParent) => {
    setParent({ ...parent, ...newParent });
  };

  const handleCreateComponent = () => {
    upload({ ...component, RENDER: [calculateRender(parent)] });
  };

  const upload = async (component) => {
    const stringComponent = JSON.stringify(component);
    // Se debe eliminar las comillas dobles existentes en el string
    console.log(stringComponent);
    const resultado = stringComponent
      .replace(/;"}}],"label":"[A-Za-z°,":;}]*/g, ';}];}}];')
      .replace(/"/g, '')
      .replace(/°/g, '"')
      .replace(/],/g, ']')
      // Se debe reemplazar [{ por [
      .replace(/\[{/g, '[')
      .replace(/}]/g, ']')
      .replace(/;]/g, ';}]')
      .replace(/:{/g, '{')
      .replace(/click{function:/g, 'on_click: function_')
      .replace(/;,/g, ';')
      .replace(/xxcontent/g, 'content')
      .replace(/\(\);}}/g, '();}')
      .replace(/\(\);}}/g, '();')
      .replace(/;,/g, ';content:')
      .replace(/content:{/g, 'content:[')
      .replace(/";}]}]/g, '";}];}];}]')

    console.log(resultado.slice(1, -1));
    await axios
      .post('http://localhost:3000/translate', { SCSL: resultado.slice(1, -1) })
      .then((response) => {
        setTranslation(JSON.stringify(response.data));
        console.log(response);
      })
      .catch((error) => {
        setTranslation(`Something went wrong... ${error.message || error}`);
        console.log(error);
      });
  };

  return (
    <>
      <div className='main-component-node container rounded border p-0 width border-primary-subtle bg-primary-subtle border-primary-subtle text-primary-emphasis'>
        <Handle type='target' position={Position.Left} id='main-left' />
        <Handle type='target' position={Position.Right} id='main-right' />
        <div className='custom-node__header border-bottom'>
          <div className='input-group'>
            <span className='input-group-text text-primary-emphasis bg-primary-subtle'>
              Name:{' '}
            </span>
            <input
              type='text'
              className='form-control nodrag'
              placeholder='My Component'
              onChange={(e) => (component.NAME = [`°${e.target.value}°`])}
            />
          </div>
        </div>
        <div className='custom-node__body p-2 container bg-body'>
          <div className='border rounded container'>
            <Element id={parent.id} onChange={onParentChange} />
          </div>
        </div>
        <button className='btn' onClick={handleCreateComponent}>
          CREATE COMPONENT
        </button>
      </div>
      {translation && <Translation translation={translation} />}
    </>
  );
}

export default MainComponent;
