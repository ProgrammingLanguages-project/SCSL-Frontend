import React, {useState} from "react";

const Input = ({onChangeSubElement, eid}) => {
    const [subElementInputs, setSubElementInputs] = useState({label: "", type: ""})

    const onChange = (e) => {
        const { name, value } = e.target;
        setSubElementInputs({ ...subElementInputs, [name]: value });
        /*component.RENDER.element_input = subElementInputs;*/

        onChangeSubElement('element_input', subElementInputs, eid)
    };
    
    return (
        <>
            <div className="input-group m-2">
                <span className="input-group-text bg-primary-subtle border-primary-subtle" id="basic-addon2">Label: </span>
                <input type="text" className="form-control nodrag" placeholder="Name (4 to 8 characters):" name="label" onChange={onChange} />
              </div>
              <div className="input-group m-2">
                <span className="input-group-text bg-primary-subtle border-primary-subtle" id="basic-addon2">Type: </span>
                <select className='form-select col' name="type" onChange={onChange} >
                  <option value=''>Select a type</option>
                  <option value='text'>Text</option>
                  <option value='number'> Number </option>
                  <option value='email'> Email </option>
                  <option value='password'> Password </option>
                  <option value='date'> Date </option>
                </select>
              </div>
        </>
    )
}

export default Input;