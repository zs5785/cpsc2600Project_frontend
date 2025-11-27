import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useFavItems } from "../contexts/FavouriteProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ItemAction(props){
    const fav = useFavItems();
    const auth = useAuth();
    const navigate = useNavigate();

    const {hidden, item, onToggleFav, onDelete} = props;

    const sellerName = item.user[0].username;

    const [isOwner, setIsOwner] = useState(sellerName === auth.user);
    const [faved, setFaved] = useState(fav.containsItem(item));

    useEffect(()=>{
        setIsOwner(sellerName === auth.user || auth.isAdmin());
        setFaved(fav.containsItem(item));
    }, [auth, fav])

    function onCopy(){
        let message = 'Hi ' + sellerName + ' I would like to trade ' +
                        item.rarity + ' ' + item.item[0].itemname;
        if (item.mods.length > 0){
            message += ' with';
            item.mods.forEach((ele)=>{
                message += ' ' + ele.name.replace('#', ele.val1);
            });
        }
        message += ' for ' + item.price + ' coins';

        navigator.clipboard.writeText(message);
    }

    function onFav(){
        const newState = !faved;
        setFaved(newState);
        onToggleFav(item, newState);
    }

    function onEdit(){
        navigate('/post/?id='+item._id);
    }

    function onDeletePost(){
        const payload = {
            id: item._id,
            token: auth.token
        };

        const data = JSON.stringify(payload);

        axios.delete(`${import.meta.env.VITE_SERVER_URL}/item/delete/${data}`)
            .then((response)=>{
                console.log(response.data.message);
                onDelete(item._id);
            })
            .catch((err)=>console.error(err));
    }

    return (
        <div className={"item-action " + (hidden ? " hidden" : "")}>
            <button className="clickable" onClick={onCopy}><i className="fa-solid fa-comments-dollar"></i></button>
            <button className="clickable" onClick={onFav}><i className={(faved ? "fa-solid red-heart" : "fa-regular") + " fa-heart"}></i></button>
            {isOwner && <button className="clickable" onClick={onEdit}><i className="fa-solid fa-gear"></i></button>}
            {isOwner && <button className="clickable" onClick={onDeletePost}><i className="fa-solid fa-trash"></i></button>}
        </div>
    );
}

export default ItemAction;