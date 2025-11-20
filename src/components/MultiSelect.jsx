import { nanoid } from 'nanoid';
import '../css/multiselect.css';
import { useState } from "react";

function MultiSelect(props){
    const {label, options, values, setValues} = props;
    const [toggle, setToggle] = useState(false);

    function onMenuClicked(){
        const oldToggle = toggle;
        setToggle(!oldToggle);
    }

    function optionClicked(clickedValue){
        if (values.indexOf(clickedValue)>=0)
            setValues(values.filter((ele)=>ele!==clickedValue));
        else
            setValues([...values, clickedValue]);
    }
    
    return (
        <div className='multi-select'>
            <button className="clickable" type="button" onClick={onMenuClicked}>{label}<i className="fa-solid fa-sort-down"></i></button>
            <div className={toggle ? "menu-show" : "menu-hide"}>
                {options.map((ele)=>{
                    return (
                        <div key={nanoid()} onClick={()=>optionClicked(ele)}>
                            <input type="checkbox" value={ele} defaultChecked={values.indexOf(ele)>=0} />
                            <label className='noselect'>{ele}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MultiSelect;