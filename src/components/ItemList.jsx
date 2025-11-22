import ItemCard from './ItemCard';
import { nanoid } from 'nanoid';
import Spinner from './Spinner';

function ItemList(props){
    const {listType, loading, items, newItems} = props;

    if (loading)
        return <Spinner />;

    return (
        <div className={'list ' + (listType < 1 || items.length < 2 ? 'list-signle' : (listType < 2 || items.length < 3) ? 'list-double' : 'list-triple')}>
            {items.map((item)=>{
                return (<ItemCard key={nanoid()} item={item} />);
            })}
        </div>
    );
}

export default ItemList;