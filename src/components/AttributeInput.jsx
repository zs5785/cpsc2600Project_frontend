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

    const val1Placeholder = single ? "Value" : "Min";
    const val2Placeholder = "Max";

    return (
        <div className="attr-container">
            <DropDown 
                elementID={elementID} 
                options={options} 
                onChange={handleOptionChanged} 
                value={selectedName} 
                nullLabel='---Select Mod---'
                defaultNull 
                required 
            />
            <div>
                <input 
                    key={1} 
                    onChange={handleVal1Changed} 
                    id={elementID+"-v1"} 
                    value={val1} 
                    required={single && required}
                    placeholder={val1Placeholder}
                />
                {!single && 
                <input 
                    key={2} 
                    onChange={handleVal2Changed} 
                    id={elementID+"-v2"} 
                    value={val2} 
                    placeholder={val2Placeholder}
                />}
            </div>
            <div className="clickable sub-btn"  onClick={onRemove}><i className="fa-solid fa-minus"></i></div>
        </div>
    );
}

export default AttributeInput;