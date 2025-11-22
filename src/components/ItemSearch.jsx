import '../css/search.css';
import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import MultiSelect from "./MultiSelect";
import axios from "axios";
import ItemList from "./ItemList";
import AttributeList from "./AttributeList";

function ItemSearch(props){
    const listTypeLocID = 'ListType';

    const {sellerName} = props;

    const [datas, setDatas] = useState({loading: true, items: [], rarities: [], itemTypes: [], mods: []});
    
    const [list, setList] = useState({loading: true, items: []});
    
    const [searchItem, setSearchItem] = useState([]);
    const [typesFilter, setTypesFilter] = useState([]);
    const [raritiesFilter, setRaritiesFilter] = useState([]);
    const [modFilters, setModFilters] = useState([]);
    const [priceFilter, setPriceFilter] = useState({min: "", max: ""});
    const [sortType, setSortType] = useState("Newest");

    const [toggleSearch, setToggleSearch] = useState(true);
    const [listType, setListType] = useState(localStorage.getItem(listTypeLocID) || 0);

    const printError = (error)=>console.error(error);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_SERVER_URL + "/item/attr")
            .then((response)=>{
                let updatedData = {...datas};
                updatedData.mods = response.data.mods;
                updatedData.rarities = response.data.rarity;
                updatedData.itemTypes = response.data.types;

                axios.get(import.meta.env.VITE_SERVER_URL + "/item/base")
                    .then((response)=>{
                        updatedData.items = response.data;
                        updatedData.loading = false;
                        setDatas(updatedData);

                        search();
                    })
                    .catch(printError);
            })
            .catch(printError);
    }, []);

    function updateListType(newListType){
        setListType(newListType);
        localStorage.setItem(listTypeLocID, newListType);
    }

    function search(){
        const sortField = (sortType === 'Newest' || sortType === 'Oldest') ? 'listDate' : 'price';
        const sortOrder = (sortType === 'Newest' || sortType === 'Priciest') ? -1 : 1;
        
        const params = {
            sortField: sortField,
            sortOrder: sortOrder,
            items: JSON.stringify(searchItem),
            types: JSON.stringify(typesFilter),
            rarities: JSON.stringify(raritiesFilter),
            minPrice: priceFilter.min,
            maxPrice: priceFilter.max,
            mods: JSON.stringify(modFilters),
            sellerName: sellerName,
        };

        axios.get(import.meta.env.VITE_SERVER_URL + "/item/query", {params: params})
            .then((response)=>{
                setList({loading: false, items: response.data});
            })
            .catch((error)=>console.error(error));
    }

    function reset(){
        setSearchItem([]);
        setTypesFilter([]);
        setRaritiesFilter([]);
        setModFilters([]);
        setPriceFilter({min: "", max: ""});
    }

    return (
        <div>
            <div className={(toggleSearch?"search-container":"search-container hide-search")}>
                <h2 className='search-heading'>Search</h2>
                <form className="container" onSubmit={(e)=>{e.preventDefault(); search();}}>
                    <label>Filters</label>
                    <div className="search-filters">
                        <MultiSelect 
                            label="Item"
                            options={datas.items.map((ele)=>ele.itemname)}
                            values={searchItem}
                            setValues={setSearchItem}
                        />
                        <MultiSelect 
                            label="Type" 
                            options={datas.itemTypes} 
                            values={typesFilter}
                            setValues={setTypesFilter}
                        />
                        <MultiSelect 
                            label="Rarity" 
                            options={datas.rarities} 
                            values={raritiesFilter}
                            setValues={setRaritiesFilter}
                        />
                    </div>
                    <div className='search-price'>
                        <div>
                            <label>Minimum Price</label>
                            <input 
                                type="number" 
                                name="min-price" 
                                id="min-price" 
                                onChange={(e)=>setPriceFilter({...priceFilter, min: e.target.value})}
                                value={priceFilter.min}
                                min={1}
                                step={1}
                            />
                        </div>
                        <div>
                            <label>Maximum Price</label>
                            <input 
                                type="number" 
                                name="max-price" 
                                id="max-price" 
                                onChange={(e)=>setPriceFilter({...priceFilter, max: e.target.value})}
                                value={priceFilter.max}
                                min={1}
                                step={1}
                            />
                        </div>
                    </div>
                    <div className="search-mods">
                        <label>Mods</label>
                        <AttributeList options={datas.mods} listID="Mod" list={modFilters} onListChange={setModFilters} required/>
                    </div>
                    <div className="search-actions">
                        <label>Sort by
                            <DropDown 
                                elementID="sort-type" 
                                options={['Newest', 'Oldest', 'Cheapest', 'Priciest']} 
                                onChange={(e)=>setSortType(e.target.value)} 
                                value={sortType} 
                            />
                        </label>
                        <button type="button" className="big-font clickable" onClick={reset}>Reset</button>
                        <input className='big-font clickable' type="submit" name="add" value="Search" />
                    </div>
                </form>
                <button 
                    className='clickable' 
                    onClick={()=>setToggleSearch(!toggleSearch)}
                >
                    <i className={"fa-solid "+(toggleSearch?"fa-caret-up":"fa-caret-down")}></i>
                </button>
            </div>
            <div className='search-result' id='search-result'>
                {!list.loading && <h2>{list.items.length > 0 ? "Result" : "No Match"}</h2>}
                {!list.loading && list.items.length > 0 && 
                    <div className='list-btn'>
                        <button className='clickable' onClick={()=>updateListType(0)}><i className="fa-solid fa-list"></i></button>
                        <button className='clickable' onClick={()=>updateListType(1)}><i className="fa-solid fa-table-cells-large"></i></button>
                        <button className='clickable' onClick={()=>updateListType(2)}><i className="fa-solid fa-table-cells"></i></button>
                    </div>
                }
                <ItemList loading={list.loading} items={list.items} listType={listType} />
            </div>
        </div>
    );
}

export default ItemSearch;