import { nanoid } from 'nanoid';
import '../css/multiselect.css';
import { useEffect, useRef, useState } from "react";

function CheckBox(props){
    const {ele, checked, clicked, halfChecked} = props;

    const cRef = useRef();

    useEffect(()=>{
        cRef.current.indeterminate = halfChecked;
    }, [cRef, halfChecked]);

    return (
        <div onClick={clicked} className='clickable'>
            <input className='checkbox' readOnly type="checkbox" value={ele} defaultChecked={checked} ref={cRef}/>
            <label className='noselect'>{ele}</label>
        </div>
    );
}

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
        <div className='multi-select' onMouseLeave={()=>setToggle(false)}>
            <button className="clickable" type="button" onClick={onMenuClicked}>{label}<i className="fa-solid fa-angle-down"></i></button>
            <div className={toggle ? "menu-show" : "menu-hide"}>
                <CheckBox 
                    key={nanoid()}
                    ele='All' 
                    checked={values.length === options.length} 
                    clicked={()=>{
                        if (values.length < options.length)
                            setValues(options);
                        else
                            setValues([]);
                    }} 
                    halfChecked={values.length > 0 && values.length < options.length}
                />
                {options.map((ele)=>{
                    return (<CheckBox 
                        key={nanoid()} 
                        ele={ele} 
                        checked={values.indexOf(ele)>=0} 
                        clicked={()=>optionClicked(ele)}
                    />);
                })}
            </div>
        </div>
    );
}

export default MultiSelect;