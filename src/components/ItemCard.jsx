import Mod from './Mod';
import Stat from './Stat';
import { nanoid } from 'nanoid';
import '../css/itemcard.css';
import { Link, useNavigate } from 'react-router-dom';

function ItemCard(props){
    const navigate = useNavigate();

    const {item, newItem} = props;
    const baseItem = item.item[0];
    
    const sellerName = item.user[0].username;

    let typeIconMap = "fa-flask";
    switch(baseItem.type){
        case "Weapon": 
            typeIconMap = "fa-gun";
            break;
        case "Armor": 
            typeIconMap = "fa-shield-halved";
            break;
    }

    return (
        <div className='container item-card'>
            <div className='item-head'>
                <b className={'round-box ' + item.rarity}>{item.rarity}</b>
                <h2>{baseItem.itemname}</h2>
                <i className={"item-type fa-solid " + typeIconMap}></i>
            </div>
            <img src={baseItem.icon} alt={baseItem.itemname} />
            <div className='detail'>
                <div className='stats'>{baseItem.stats.map((ele)=>{return (<Stat key={nanoid()} attr={ele} />)})}</div>
                <div className='mods'>{item.mods.map((ele)=>{return (<Mod key={nanoid()}  attr={ele} />)})}</div>
            </div>
            <div className='footer'>
                <Link reloadDocument to={'/?filter='+JSON.stringify({seller: sellerName})}>From {sellerName}</Link>
                <div className='price'><b>{'$'+item.price}</b></div>
            </div>
        </div>
    );
}

export default ItemCard;