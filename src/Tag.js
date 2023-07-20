import React from "react";

function Facility(p) {
    // console.log('this is facility' + new Date()); 

    return (
        <div className="col-6 facility-text">
            {p.icon} {p.title}
        </div>
    );
}

export default Facility;