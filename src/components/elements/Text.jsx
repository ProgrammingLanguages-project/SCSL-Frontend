import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Text = ({ onElementPropsChange }) => {
  const [textProps, setTextProps] = useState({
    content: '',
    tag: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const newTextProps = { ...textProps, [name]: value };
    onElementPropsChange(newTextProps);
    setTextProps(newTextProps);
  };

  return (
    <>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Content:{' '}
        </span>
        <textarea
          className='form-control'
          aria-label='With textarea'
          placeholder='I have been clicked {clicksNumber} times'
          name='content'
          onChange={onChange}
        ></textarea>
      </div>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon3'>
          Tag:{' '}
        </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='My message'
          aria-label='My message'
          aria-describedby='basic-addon3'
          name='tag'
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Text;
