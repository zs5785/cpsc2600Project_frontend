import { nanoid } from "nanoid";

function DropDown(props){
    const {elementID, options, onChange, value, optionValue, optionLabel, defaultNull, nullLabel, required} = props;

    const getValue = optionValue ? optionValue : (ele)=>ele;
    const getLabel = optionLabel ? optionLabel : (ele)=>ele;

    return (
        <select id={elementID} onChange={onChange} value={value} required={required}>
            {defaultNull && <option key={nanoid()} value="" disabled={required}>{nullLabel}</option>}
            {options.map((ele)=>{
                return (<option key={nanoid()} value={getValue(ele)}>{getLabel(ele)}</option>);
            })}
        </select>
    );
}

export default DropDown;