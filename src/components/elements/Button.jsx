import React from 'react'
import { useStoreApi } from 'reactflow';

const Button = ({onChangeSubElement}) => {
  const store = useStoreApi();
  const { nodeInternals } = store.getState();
  const variablesNode = nodeInternals.get('node-2')
  //console.log(variablesNode);

  const objeto1 = variablesNode?.data?.variableValues || [];
  console.log(objeto1);
    return (
        <>
            <div className="input-group">
              <span className="input-group-text">Label: </span>
              <input name="content" type="text" className="form-control nodrag" placeholder="Click me!" aria-label="Click me!" aria-describedby="basic-addon2" />
            </div>
            <div className="input-group">
              <span className="input-group-text">Tag: </span>
              <input name="tag" type="text" className="form-control nodrag" placeholder="My Component" aria-label="My Component" aria-describedby="basic-addon3" />
            </div>
            <div className="input-group">
              <span className="input-group-text">Click: </span>
              <div>
                <select className="form-select col" aria-label="Type">
                  <option selected>Increase Variable</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <div className="input-group">
                  <span className="input-group-text">Variable: </span>
                  <select className="form-select col" aria-label="Type">
                    <option value="" selected>Choose a variable: </option>
                    {Object.keys(objeto1).map((key) => (
                      <option key={key} value={objeto1[key].variable}>{objeto1[key].variable}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            </>
    )
}

export default Button;
