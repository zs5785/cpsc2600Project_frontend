import { useState } from "react";
import DropDown from "./DropDown";
import MultiSelect from "./MultiSelect";

function SearchBar(props){
    const {preSearch} = props;

    const [search, setSearch] = useState("");

    const [mselect, setMSelect] = useState([]);

    return (
        <form>
            <MultiSelect 
                label="Test" 
                options={['a', 'b', 'c', 'd']} 
                values={mselect}
                setValues={setMSelect}
            />
            {/* <label>Rarity
                <DropDown 
                    elementID="rarity" 
                    options={datas.rarities} 
                    onChange={handleRarityChange} 
                    value={rarity} 
                />
            </label> */}
        </form>
    );
}

export default SearchBar;