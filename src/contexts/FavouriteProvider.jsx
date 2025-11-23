import { useContext, createContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

function FavouriteProvider({children}){
    const favItemsLocID = 'favItems';

    function getFavItemsFromLoc(){
        const value = localStorage.getItem(favItemsLocID);
        if (value)
            return JSON.parse(value);
        else
            return [];
    }

    const [favItems, setFavItems] = useState(getFavItemsFromLoc());

    useEffect(()=>{
        //TODO check and remove deleted favourites
    }, []);

    function containsItem(item){
        return favItems.find((ele)=>ele._id===item._id);
    }
    
    function add(item){
        if (containsItem(item)){
            const updatedList = favItems.map((ele)=>{
                if (ele._id===item._id)
                    return item;
                else
                    return ele;
            });
            setFavItems(updatedList);
            localStorage.setItem(favItemsLocID, JSON.stringify(updatedList));
        }
        else{
            const updatedList = [...favItems, item];
            setFavItems(updatedList);
            localStorage.setItem(favItemsLocID, JSON.stringify(updatedList));
        }
    }

    function clear(){
        localStorage.removeItem(favItemsLocID);
        setFavItems([]);
    }

    function remove(item){
        const updatedList = favItems.filter((ele)=>ele._id!==item._id);
        setFavItems(updatedList);
        localStorage.setItem(favItemsLocID, JSON.stringify(updatedList));
    }

    return (
        <FavouritesContext.Provider value={{favItems, containsItem, add, remove, clear}}>
            {children}
        </FavouritesContext.Provider>
    );
}

export default FavouriteProvider;

export const useFavItems = ()=>{
    return useContext(FavouritesContext);
};