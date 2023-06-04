import React from "react";

const Text = () => {
    return (
        <>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">Content: </span>
              <textarea className="form-control" aria-label="With textarea" placeholder="I have been clicked {clicksNumber} times"></textarea>
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">Tag: </span>
              <input type="text" className="form-control nodrag" placeholder="My message" aria-label="My message" aria-describedby="basic-addon3" />
            </div>
        </>
    )
}

export default Text;