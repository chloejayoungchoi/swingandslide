import React, {useState} from "react";
import { BiMeteor } from "react-icons/bi";

function SearchCheckbox(p) {
    // console.log('this is search checkbox' + new Date()); 
    const [checked, setChecked] = useState(false);

    function handleChange(e) {
        setChecked(e.target.checked);
        p.changeCondition(p.column, e.target.checked);
    }

    return (
        <div className="col-lg-12 col-md-6">
            <div className={"mb-2 card facility-check text-gray " + (checked ? 'border-checked' : '')}>
                <div className="card-body">
                    <div className="form-check ps-0 d-flex justify-content-between align-items-center">
                        <label className="form-check-label" htmlFor={p.column}>
                            {p.icon} {p.title}
                        </label>
                        <input 
                            className="form-check-input search-checkbox" 
                            type="checkbox" 
                            value="" 
                            id={p.column}
                            onClick={handleChange}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCheckbox;