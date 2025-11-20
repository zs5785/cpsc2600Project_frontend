import AttributeInput from "./AttributeInput";
import '../css/attributes.css';

function AttributeList(props){
    const {options, listID, list, onListChange, single, required} = props;

    function addAttr(){
        const newObj = single ? 
        {
            name: "",
            val1: ""
        }:
        {
            name: "",
            val1: "",
            val2: ""
        };

        onListChange([...list, newObj]);
    }

    return (
        <div className="attr-list-container">
            {list.map((ele, index)=>{
                return (<AttributeInput key={index}
                    options={options} 
                    selected={ele} 
                    elementID={listID + index} 
                    onChange={(newEle)=>{
                        let updatedList = [...list];
                        updatedList[index] = newEle;
                        onListChange(updatedList);
                    }} 
                    onRemove={()=>{
                        onListChange(list.filter((_, i)=>i!==index));
                    }}
                    single={single}
                    required={required}/>);
            })}
            <button type="button" className="clickable add-btn" onClick={addAttr}><i className="fa-solid fa-plus"></i></button>
        </div>
    );
}

export default AttributeList;