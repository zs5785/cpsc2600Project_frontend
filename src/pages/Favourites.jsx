import ItemSearch from "../components/ItemSearch";
import { useFavItems } from "../contexts/FavouriteProvider";

function Favourites(){
    const fav = useFavItems();

    return (
        <div>
            <h1>Favourites</h1>
            <ItemSearch searchFav />
        </div>
    );
}

export default Favourites;