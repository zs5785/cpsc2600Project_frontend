import Mod from './Mod';
import Stat from './Stat';
import '../css/itemcard.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ItemAction from './ItemAction';

function ItemCard(props){
    const {item, pastItem, onToggleFav, onDelete} = props;
    const baseItem = item.item[0];
    
    const sellerName = item.user[0].username;

    const [showAction, setShowAction] = useState(false);

    let typeIconMap = "fa-flask";
    switch(baseItem.type){
        case "Weapon": 
            typeIconMap = "fa-gun";
            break;
        case "Armor": 
            typeIconMap = "fa-shield-halved";
            break;
    }

    function isDif(){
        if (!pastItem){
            return false;
        }
        
        return JSON.stringify(pastItem) !== JSON.stringify(item);
    }

    function onMouseEnter(){
        if (isDif()){
            onToggleFav(item, true);
        }
        setShowAction(true);
    }

    return (
        <div className='container item-card'
             onMouseOver={onMouseEnter} 
             onMouseOut={()=>setShowAction(false)}
        >
            <ItemAction hidden={!showAction} item={item} onToggleFav={onToggleFav} onDelete={onDelete} />
            <div className='item-head'>
                <b className={'round-box ' + item.rarity}>{item.rarity}</b>
                <h2>{baseItem.itemname}</h2>
                <i className={"item-type fa-solid " + typeIconMap}></i>
            </div>
            <img src={baseItem.icon} alt={baseItem.itemname} />
            <div className='detail'>
                <div className='stats'>{baseItem.stats.map((ele, index)=>{return (<Stat key={index} attr={ele} />)})}</div>
                <div className='mods'>{item.mods.map((ele, index)=>{return (<Mod key={index}  attr={ele} />)})}</div>
            </div>
            <div className='footer'>
                <Link reloadDocument to={'/?filter='+JSON.stringify({seller: sellerName})}>
                    <b>From {sellerName}</b>
                </Link>
                <div className='price'><b>{'$'+item.price}</b></div>
            </div>
            {isDif() && <div className='dif'></div>}
        </div>
    );
}

export default ItemCard;