import React, {useState} from "react";

const Variable = ({id, onDelete, addVariableValue}) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState("")

    const handleNameChange = (e) => {
        setName(e.target.value)
        addVariableValue(id, {variable: name, value: value})
    }

    const handleValueChange = (e) => {
        setValue(e.target.value)
        addVariableValue(id, {variable: name, value: value})
    }

    return (
        <>
            <div className='container'>
                <div className="input-group">
                    <span className="input-group-text">Name: </span>
                    <input name="variable" type="text" className="form-control nodrag" placeholder="My Component" onChange={handleNameChange} />
                </div>
                <div className="input-group">
                    <span className="input-group-text">Value: </span>
                    <input name="value" type="text" className="form-control nodrag" placeholder="My Component" onChange={handleValueChange} />
                </div>
                <div className="row">
                    <div className='col'>
                        <button className='btn' onClick={() => onDelete(id)}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Variable;
