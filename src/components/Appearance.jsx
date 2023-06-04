import { Handle, Position } from "reactflow";

export function Appearance({ data, isConnectable }) {
  const handleValueChange = (e) => {
    data.appearanceValue = e.target.value;
  };

  return (
    <div className='main-component-node container rounded border p-0 width'>
      <Handle type="source" position={Position.Left} id='appearance' />
      <div className='custom-node__header border-bottom'>
        <div className='h5'>Appearance</div>
      </div>

      <div className='input-group'>
        <textarea
          name='value'
          type='text'
          rows='10'
          className='form-control nodrag'
          placeholder='classname {
    style-a : style
}'
          onChange={handleValueChange}
        />
      </div>
    </div>
  );
}
