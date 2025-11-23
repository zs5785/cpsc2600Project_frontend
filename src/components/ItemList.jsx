import ItemCard from './ItemCard';
import { nanoid } from 'nanoid';
import Spinner from './Spinner';

function ItemList(props){
    const {listType, loading, items, oldItems, onToggleFav, onDelete} = props;

    function getOldItem(item){
        if (oldItems)
            return oldItems.find((ele)=>ele._id===item._id);
        else
            return null;
    }

    if (loading)
        return <Spinner />;

    return (
        <div className={'list ' + (listType < 1 || items.length < 2 ? 'list-signle' : (listType < 2 || items.length < 3) ? 'list-double' : 'list-triple')}>
            {items.map((item)=>{
                return (<ItemCard 
                            key={nanoid()} 
                            item={item} 
                            pastItem={getOldItem(item)} 
                            onToggleFav={onToggleFav} 
                            onDelete={onDelete}/>);
            })}
        </div>
    );
}

export default ItemList;