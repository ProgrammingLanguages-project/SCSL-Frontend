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
        <div className='input-group m-2'>
          <span className='input-group-text bg-success-subtle border-success-subtle' >Name: </span>
          <input
            name='variable'
            type='text'
            className='form-control nodrag'
            placeholder='myFunction'
            onChange={handleNameChange}
          />
        </div>
        <div className='input-group m-2'>
          <span className='input-group-text bg-success-subtle border-success-subtle'>Value: </span>
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
            <button className='btn border-success-subtle' onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
