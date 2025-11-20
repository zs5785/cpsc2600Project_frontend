import { nanoid } from "nanoid";

function DropDown(props){
    const {elementID, options, onChange, value, optionValue, optionLabel, defaultNull, multiple} = props;

    const getValue = optionValue ? optionValue : (ele)=>ele;
    const getLabel = optionLabel ? optionLabel : (ele)=>ele;

    return (
        <select id={elementID} onChange={onChange} value={value} required multiple={multiple}>
            {defaultNull && <option key={nanoid()} value="" disabled></option>}
            {options.map((ele)=>{
                return (<option key={nanoid()} value={getValue(ele)}>{getLabel(ele)}</option>);
            })}
        </select>
    );
}

export default DropDown;