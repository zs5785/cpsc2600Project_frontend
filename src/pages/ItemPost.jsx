import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import AttributeList from "../components/AttributeList";
import DropDown from "../components/DropDown";

function ItemPost(props){

    const auth = useAuth();
    const navigate = useNavigate();

    const [datas, setDatas] = useState({loading: true, items: [], rarities: [], mods: []});

    const [item, setItem] = useState({});
    const [rarity, setRarity] = useState("");
    const [mods, setMods] = useState([]);
    const [price, setPrice] = useState(0);

    const printError = (error)=>console.error(error);

    useEffect(()=>{
        if (!auth.user)
            navigate('/');

        axios.get(import.meta.env.VITE_SERVER_URL + "/item/attr")
            .then((response)=>{
                let updatedData = {...datas};
                updatedData.mods = response.data.mods;
                updatedData.rarities = response.data.rarity;

                axios.get(import.meta.env.VITE_SERVER_URL + "/item/base")
                    .then((response)=>{
                        updatedData.items = response.data;
                        updatedData.loading = false;
                        setDatas(updatedData);
                    })
                    .catch(printError);

            })
            .catch(printError);
    }, [auth]);

    function handlePost(e){
        e.preventDefault();
        const itemData = {
            itemID: item._id,
            token: auth.token,
            rarity: rarity,
            price: price,
            mods: mods
        };

        axios.post(import.meta.env.VITE_SERVER_URL + "/item/sell", itemData)
            .then((response)=>{
                console.log(response.data);
            })
            .catch(printError);
    }

    function handleItemChange(e){
        setItem(datas.items.find((ele)=>ele._id === e.target.value));
    }

    function handleRarityChange(e){
        setRarity(e.target.value);
    }

    function handlePriceChange(e){
        setPrice(e.target.value);
    }

    function randomRangeInt(min, max){
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    function getRandomEle(list){
        const randomIndex = randomRangeInt(0, list.length);
        return list.at(randomIndex);
    }

    function randomize(){
        setItem(getRandomEle(datas.items));

        const ranRarity = getRandomEle(datas.rarities);
        const rarityIndex = datas.rarities.indexOf(ranRarity);

        let modList = [];
        for(let i = 0; i <= rarityIndex * 2; i++){
            modList.push({
                name: getRandomEle(datas.mods),
                val1: randomRangeInt(1, 20)
            });
        }

        setMods(modList);
        setPrice(randomRangeInt(1+rarityIndex*100, 1000));
        setRarity(ranRarity);
    }

    function reset(){
        setItem({});
        setMods([]);
        setPrice(0);
        setRarity("");
    }

    if (datas.loading)
        return (<Spinner />);

    return (
        <div>
            <h2>Post Item</h2>
            <form onSubmit={handlePost} className="container form-container">
                <label>Item
                    <DropDown 
                        elementID="item-base" 
                        options={datas.items} 
                        onChange={handleItemChange} 
                        value={item._id} 
                        optionValue={(ele)=>ele._id}
                        optionLabel={(ele)=>ele.itemname} 
                    />
                </label>
                <label>Rarity
                    <DropDown 
                        elementID="rarity" 
                        options={datas.rarities} 
                        onChange={handleRarityChange} 
                        value={rarity} 
                    />
                </label>
                <label>Mods</label>
                <AttributeList options={datas.mods} listID="Mod" list={mods} onListChange={setMods} single required/>
                <label>Price
                        <input 
                            type="number" 
                            name="price" 
                            id="price" 
                            onChange={handlePriceChange}
                            value={price}
                            min={1}
                            step={1}
                            required 
                        />
                </label>
                <div className="gap"></div>
                <button type="button" className="big-font clickable" onClick={randomize}>Random</button>
                <button type="button" className="big-font clickable" onClick={reset}>Reset</button>
                <input className='big-font clickable' type="submit" name="add" value="Add" />
            </form>
        </div>
    );
}

export default ItemPost;