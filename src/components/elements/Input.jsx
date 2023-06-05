import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({ onElementPropsChange }) => {
  const [inputProps, setInputProps] = useState({
    label: '',
    type: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const newInputProps = { ...inputProps, [name]: value };
    onElementPropsChange(newInputProps);
    setInputProps(newInputProps);
  };

  return (
    <>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Label:
        </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='Name (4 to 8 characters):'
          name='label'
          onChange={onChange}
        />
      </div>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Type:
        </span>
        <select className='form-select col' name='type' onChange={onChange}>
          <option value=''>Select a type</option>
          <option value='text'>Text</option>
          <option value='number'> Number </option>
          <option value='email'> Email </option>
          <option value='password'> Password </option>
          <option value='date'> Date </option>
        </select>
      </div>
    </>
  );
};

export default Input;
