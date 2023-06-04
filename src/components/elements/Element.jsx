import React, { useState } from 'react';
import Button from './Button';
import Text from './Text';
import Link from './Link';

const Element = ({id, onDelete, onChangeComponent}) => {
    const [subElements, setSubElements] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [subElementInputs, setSubElementInputs] = useState({})

    const onChange = (e) => {
        const { name, value } = e.target;
        setSubElementInputs({ ...subElementInputs, [name]: [value] });
        //onChangeComponent({name: , subElementInputs})
        console.log(subElementInputs);
    };

  const addSubElement = () => {
    const newSubElement = {
      id: Date.now(),
    };
    setSubElements([...subElements, newSubElement]);
  };

  const deleteSubElement = (id) => {
    const newSubElements = subElements.filter(
      (subElement) => subElement.id !== id
    );
    setSubElements(newSubElements);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const elementMapping = {
    option1: Button,
    option2: Text,
    option3: Link,
  };

  const SelectedElement = elementMapping[selectedOption];

  return (
    <>
      <div className='border-bottom container pt-3 pb-3'>
        <div className='row'>
          <select
            value={selectedOption}
            className='form-select col'
            onChange={handleSelectChange}
          >
            <option value=''>Select an element</option>
            <option value='option1'>Button</option>
            <option value='option2'>Text</option>
            <option value='option3'>Link</option>
          </select>
          <button className='btn col' onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
        {SelectedElement && <SelectedElement />}
        <div className='container rounded border'>
          {subElements.map((subElement) => (
            <div key={subElement.id}>
              <Element id={subElement.id} onDelete={deleteSubElement} onChangeSubElement={onChange} />
            </div>
          ))}
        </div>
        <div className='text-end'>
          <button className='btn' onClick={addSubElement}>
            Add subelement
          </button>
        </div>
      </div>
    </>
  );
};

export default Element;
