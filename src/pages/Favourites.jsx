import ItemSearch from "../components/ItemSearch";
import { useFavItems } from "../contexts/FavouriteProvider";

function Favourites(){
    const fav = useFavItems();

    return (
        <div>
            <div className="fav-heading">
                <h1>Favourites</h1>
                <button className="clickable" onClick={()=>fav.clear()}>Clear All</button>
            </div>
            <ItemSearch searchFav />
        </div>
    );
}

export default Favourites;