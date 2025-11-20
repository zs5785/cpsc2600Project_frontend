import { nanoid } from "nanoid";
import DropDown from "./DropDown";

function AttributeInput(props){
    const {options, selected, elementID, onChange, onRemove, single, required} = props;

    const selectedName = selected ? selected.name : "";
    const val1 = selected ? selected.val1 : "";
    const val2 = selected ? selected.val2 : "";

    function handleOptionChanged(e){
        onChange({...selected, name: e.target.value});
    }

    function handleVal1Changed(e){
        onChange({...selected, val1: e.target.value});
    }

    function handleVal2Changed(e){
        onChange({...selected, val2: e.target.value});
    }

    return (
        <div className="attr-container">
            <DropDown elementID={elementID} options={options} onChange={handleOptionChanged} value={selectedName} defaultNull />
            <div>
                <input key={1} onChange={handleVal1Changed} id={elementID+"-v1"} value={val1} required={required}/>
                {!single && <input key={2} onChange={handleVal2Changed} id={elementID+"-v2"} value={val2} required={required}/>}
            </div>
            <button type="button" className="clickable sub-btn"  onClick={onRemove}><i className="fa-solid fa-minus"></i></button>
        </div>
    );
}

export default AttributeInput;