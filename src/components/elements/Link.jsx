import React from "react";

const Link = () => {
    return (
        <>
            <div className="input-group m-2">
                <span className="input-group-text bg-primary-subtle border-primary-subtle" id="basic-addon2">Link: </span>
                <input type="text" className="form-control nodrag" placeholder="www.mylink.com" aria-label="www.mylink.com" aria-describedby="basic-addon2" />
              </div>
              <div className="input-group m-2">
                <span className="input-group-text bg-primary-subtle border-primary-subtle" id="basic-addon2">Message: </span>
                <input type="text" className="form-control nodrag" placeholder="A funny animal video" aria-label="A funny animal video" aria-describedby="basic-addon2" />
              </div>
              <div className="input-group m-2">
                <span className="input-group-text bg-primary-subtle border-primary-subtle" id="basic-addon2">Tag: </span>
                <input type="text" className="form-control nodrag" placeholder="My hyperlink" aria-label="My hyperlink" aria-describedby="basic-addon2" />
              </div>
        </>
    )
}

export default Link;