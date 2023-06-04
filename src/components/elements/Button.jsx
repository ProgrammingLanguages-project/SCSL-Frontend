import { useStoreApi } from 'reactflow';

const Button = ({onChangeSubElement}) => {
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2');
  const functionsNode = nodeInternals.get('node-3');

  const objeto1 = variablesNode?.data?.variableValues || [];
  const functionValues = functionsNode?.data?.functionValues || [];

  return (
    <>
      <div className='input-group'>
        <span className='input-group-text'>Label: </span>
        <input
          name='content'
          type='text'
          className='form-control nodrag'
          placeholder='Click me!'
          aria-label='Click me!'
          aria-describedby='basic-addon2'
        />
      </div>
      <div className='input-group'>
        <span className='input-group-text'>Tag: </span>
        <input
          name='tag'
          type='text'
          className='form-control nodrag'
          placeholder='My Component'
          aria-label='My Component'
          aria-describedby='basic-addon3'
        />
      </div>
      <div className='input-group'>
        <span className='input-group-text'>Click: </span>
        <div>
          <div className='input-group'>
            <span className='input-group-text'>Function: </span>
            <select className='form-select col' aria-label='Type'>
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
            <select className='form-select col' aria-label='Type'>
              <option value='' selected>
                Choose a variable:{' '}
              </option>
              {Object.keys(objeto1).map((key) => (
                <option key={key} value={objeto1[key].variable}>
                  {objeto1[key].variable}
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
