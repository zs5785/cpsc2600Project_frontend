import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthProvider';
import AttributeList from "../../components/AttributeList";
import DropDown from "../../components/DropDown";

function AddItem(){
    const auth = useAuth();
    const navigate = useNavigate();

    const [datas, setDatas] = useState({
        loading: true, 
        types: [], 
        stats: []});
    const [item, setItem] = useState({
        itemName: "",
        itemType: "",
        itemIcon: ""
    });

    const [stats, setStats] = useState([]);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_SERVER_URL + "/user/" + auth.token)
            .then((response)=>{
                if (response.data && response.data.role !== 'admin'){
                    navigate('/');
                    return;
                }

                axios.get(import.meta.env.VITE_SERVER_URL + "/item/attr")
                    .then((response)=>{
                        if (response.data){
                            setDatas({
                                loading: false, 
                                types: response.data.types,
                                stats: response.data.stats});

                            handleTypeChange({target:{value:response.data.types.at(0)}});
                        }
                        else{
                            console.error('Cant get types');
                        }
                    })
                    .catch((error)=>{
                        console.error(error);
                        return;
                    });
            })
            .catch((error)=>{
                console.error(error);
                navigate('/');
                return;
            });

    }, [auth]);

    function handleSubmit(e){
        e.preventDefault();

        axios.post(import.meta.env.VITE_SERVER_URL + "/item/new", {...item, token: auth.token, itemStats: stats})
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.error(error);
            });
    }

    function handleNameChange(e){
        setItem({...item, itemName: e.target.value});
    }

    function handleTypeChange(e){
        setItem({...item, itemType: e.target.value});
    }

    function handleIconChange(e){
        setItem({...item, itemIcon: e.target.value});
    }

    function reset(){
        setItem({
            itemName: "",
            itemType: datas.types.at(0),
            itemIcon: ""
        });
        setStats([]);
    }

    if (datas.loading)
        return (<Spinner />);

    return (
        <div>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit} className="container form-container">
                <label>Item Name
                        <input 
                            type="text" 
                            name="itemname" 
                            id="itemname" 
                            onChange={handleNameChange}
                            value={item.itemName}
                            required 
                        />
                </label>
                <label>Type
                    <DropDown elementID='item-type' options={datas.types} onChange={handleTypeChange} value={item.itemType}/>
                </label>
                <label>Icon path
                        <input 
                            type="text" 
                            name="itemicon" 
                            id="itemicon" 
                            onChange={handleIconChange}
                            value={item.itemIcon}
                            required 
                        />
                </label>
                <label>Stats</label>
                <AttributeList options={datas.stats} listID="Stat" list={stats} onListChange={setStats} single required/>
                <div className="gap"></div>
                <button type="button" className="big-font clickable" onClick={reset}>Reset</button>
                <input className='big-font clickable' type="submit" name="add" value="Add" />
            </form>
        </div>
    );
}

export default AddItem;