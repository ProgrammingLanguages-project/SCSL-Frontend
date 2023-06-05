import { useEffect, useState } from 'react';
import Button from './Button';
import Text from './Text';
import Link from './Link';
import Input from './Input';
import Div from './Div';

// eslint-disable-next-line react/prop-types
const Element = ({ id, onDelete, onChange }) => {
  const [element, setElement] = useState({
    id,
    element_type: '',
    subElements: [],
  });

  const handleElementPropsChange = (props) => {
    setElement({ ...element, props });
    onChange && onChange({ ...element, props });
  };

  const handleTypeChange = (e) => {
    setElement({ ...element, element_type: e.target.value });
    onChange && onChange({ ...element, element_type: e.target.value });
  };

  const addSubElement = () => {
    const newSubElements = [
      ...element.subElements,
      {
        id: Date.now(),
      },
    ];
    setElement({ ...element, subElements: newSubElements });
    onChange && onChange({ ...element, subElements: newSubElements });
  };

  const deleteSubElement = (id) => {
    const newSubElements = element.subElements.filter(
      (subElement) => subElement.id !== id
    );
    setElement({ ...element, subElements: newSubElements });
    onChange && onChange({ ...element, subElements: newSubElements });
  };

  const handleSubElementChange = (subElement) => {
    const newSubElements = element.subElements;
    Object.assign(
      newSubElements.find(
        (oldSubElement) => oldSubElement.id === subElement.id
      ),
      subElement
    );
    setElement({ ...element, subElements: newSubElements });
    onChange && onChange({ ...element, subElements: newSubElements });
  };

  const elementTypeMap = {
    element_button: Button,
    element_text: Text,
    element_link: Link,
    element_input: Input,
    element_div: Div,
  };
  const SelectedElement = elementTypeMap[element.element_type];

  const isElementDiv = element.element_type == 'element_div';

  return (
    <div className='border-bottom container pt-3 pb-3'>
      <div className='row'>
        <select
          value={element.element_type}
          className='form-select col'
          onChange={handleTypeChange}
        >
          <option value=''>Select an element</option>
          <option value='element_div'>Div</option>
          <option value='element_button'>Button</option>
          <option value='element_text'>Text</option>
          <option value='element_link'>Link</option>
          <option value='element_input'>Input</option>
        </select>
        {onDelete && (
          <button className='btn col border-primary-subtle' onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
      {SelectedElement && (
        <SelectedElement onElementPropsChange={handleElementPropsChange} />
      )}
      <div className='container rounded border'>
        {element.subElements.map((subElement) => (
          <div key={subElement.id}>
            <Element
              id={subElement.id}
              onDelete={deleteSubElement}
              onChange={handleSubElementChange}
            />
          </div>
        ))}
      </div>
      {isElementDiv && (
        <div className='text-end'>
          <button className='btn border-primary-subtle' onClick={addSubElement}>
            Add subelement
          </button>
        </div>
      )}
    </div>
  );
};

export default Element;
