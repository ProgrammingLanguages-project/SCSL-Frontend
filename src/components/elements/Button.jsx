import { useState } from 'react';
import { useStoreApi } from 'reactflow';

// eslint-disable-next-line react/prop-types
const Button = ({ onElementPropsChange }) => {
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2');
  const functionsNode = nodeInternals.get('node-3');

  const variablesValues = variablesNode?.data?.variableValues || [];
  const functionValues = functionsNode?.data?.functionValues || [];

  const [buttonProps, setButtonProps] = useState({
    label: '',
    tag: '',
    click: {
      function: '',
      variable: '',
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    let newLinkProps = {};
    console.log('[D] name:', name);
    if (name.includes('click')) {
      const property = name.split('.')[1];
      console.log('[D] property: ', property);
      newLinkProps = {
        ...buttonProps,
        click: { ...buttonProps.click, [property]: `${value}()` },
      };
    } else {
      newLinkProps = { ...buttonProps, [name]: `°${value}°` };
    }
    onElementPropsChange(newLinkProps);
    setButtonProps(newLinkProps);
  };

  return (
    <>
      <div className='input-group m-2'>
        <span className='input-group-text text-primary-emphasis bg-primary-subtle border-primary-subtle'>Label: </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='Click me!'
          aria-label='Click me!'
          aria-describedby='basic-addon2'
          name='label'
          onChange={onChange}
        />
      </div>
      <div className='input-group m-2'>
        <span className='input-group-text text-primary-emphasis bg-primary-subtle border-primary-subtle'>Tag: </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='My Component'
          aria-label='My Component'
          aria-describedby='basic-addon3'
          name='tag'
          onChange={onChange}
        />
      </div>
      <div className='input-group m-2'>
        <span className='input-group-text text-primary-emphasis bg-primary-subtle border-primary-subtle'>Click: </span>
        <div>
          <div className='input-group'>
            <span className='input-group-text'>Function: </span>
            <select
              className='form-select col'
              aria-label='Type'
              name='click.function'
              onChange={onChange}
            >
              <option value='' selected>
                Choose a function:{' '}
              </option>
              {Object.keys(functionValues).map((key) => (
                <option key={key} value={functionValues[key].variable}>
                  {functionValues[key].variable}
                </option>
              ))}
            </select>
          </div>
          <div className='input-group'>
            <span className='input-group-text'>Variable: </span>
            <select
              className='form-select col'
              aria-label='Type'
              name='click.variable'
            >
              <option value='' selected>
                Choose a variable:{' '}
              </option>
              {Object.keys(variablesValues).map((key) => (
                <option key={key} value={variablesValues[key].variable}>
                  {variablesValues[key].variable}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Button;
