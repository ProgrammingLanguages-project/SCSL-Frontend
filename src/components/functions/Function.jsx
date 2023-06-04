import { useState } from 'react';

export function Function({ id, onDelete, addFunctionValue }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
    addFunctionValue(id, { variable: name, value: value });
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
    addFunctionValue(id, { variable: name, value: value });
  };

  return (
    <>
      <div className='container'>
        <div className='input-group'>
          <span className='input-group-text'>Name: </span>
          <input
            name='variable'
            type='text'
            className='form-control nodrag'
            placeholder='Function name'
            onChange={handleNameChange}
          />
        </div>
        <div className='input-group'>
          <span className='input-group-text'>Value: </span>
          <textarea
            name='value'
            type='text'
            className='form-control nodrag'
            placeholder='const foo = () => {};'
            onChange={handleValueChange}
          />
        </div>
        <div className='row'>
          <div className='col'>
            <button className='btn' onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
