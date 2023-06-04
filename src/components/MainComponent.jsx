import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import Element from './elements/Element';

function MainComponent({ data, isConnectable }) {
  const [elements, setElements] = useState([]);

  const addElement = () => {
    const newElement = {
      id: Date.now()
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id) => {
    const newElements = elements.filter((element) => element.id !== id);
    setElements(newElements);
  };

  return (
    <div className="main-component-node container rounded border p-0 width">
      <div className='custom-node__header border-bottom'>
      <div className="input-group">
        <span className="input-group-text">Name: </span>
        <input type="text" className="form-control nodrag" placeholder="My Component" />
      </div>
      </div>
      <div className="custom-node__body p-2 container">
        <div className='border rounded container'>
          {elements.map((element) => (
            <div key={element.id}>
              <Element id={element.id} onDelete={deleteElement} />
            </div>
          ))}
          <div className='text-end'>
            <button className='btn' onClick={addElement}>Add element</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;