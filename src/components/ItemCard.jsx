import Mod from './Mod';
import Stat from './Stat';
import { nanoid } from 'nanoid';
import '../css/itemcard.css';

function ItemCard(props){
    const {item} = props;
    const baseItem = item.item[0];

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
                <div className='price'><b>{'$'+item.price}</b></div>
            </div>
        </div>
    );
}

export default ItemCard;