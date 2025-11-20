import { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

function Home(){

    const [list, setList] = useState({loading: true, items: []});

    useEffect(()=>{
        console.log(import.meta.env.VITE_SERVER_URL);
        axios.get(import.meta.env.VITE_SERVER_URL + "/item")
            .then((response)=>{
                setList({loading: false, items: response.data});
            })
            .catch((error)=>console.error(error));
    }, []);

    return (
        <div>
            <SearchBar />
            {!list.loading && <h2>Latest</h2>}
            <ItemList loading={list.loading} items={list.items} />
        </div>
    );
}

export default Home;