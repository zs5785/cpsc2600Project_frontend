import ItemCard from './ItemCard';
import { nanoid } from 'nanoid';
import Spinner from './Spinner';
import { useState } from 'react';

function ItemList(props){
    const listTypeLocID = 'ListType';

    const {loading, items} = props;

    const [listType, setListType] = useState(localStorage.getItem(listTypeLocID) || 0);

    function updateListType(newListType){
        setListType(newListType);
        localStorage.setItem(listTypeLocID, newListType);
    }

    if (loading)
        return <Spinner />;

    return (
        <>
            <div className='list-btn'>
                <button className='clickable' onClick={()=>updateListType(0)}><i className="fa-solid fa-list"></i></button>
                <button className='clickable' onClick={()=>updateListType(1)}><i className="fa-solid fa-table-cells-large"></i></button>
                <button className='clickable' onClick={()=>updateListType(2)}><i className="fa-solid fa-table-cells"></i></button>
                <button className='clickable'><i className="fa-solid fa-arrow-down-wide-short"></i></button>
            </div>
            <div className={'list ' + (listType < 1 ? 'list-signle' : (listType < 2) ? 'list-double' : 'list-triple')}>
                {items.map((item)=>{
                    return (<ItemCard key={nanoid()} item={item} />);
                })}
            </div>
        </>
    );
}

export default ItemList;