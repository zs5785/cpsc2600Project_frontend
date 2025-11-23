import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from "react-router-dom";

function NavBar(){
    const auth = useAuth();
    const navigate = useNavigate();

    function logout(){
        auth.updateUser(null);
        auth.updateToken(null);

        navigate('/');
    }

    return (
        <nav>
            <Link reloadDocument to="/"><h1>TCenter</h1></Link>
            <ul>
                <li><Link reloadDocument to='/'>Home</Link></li>
                <li><Link to='/fav'>Favourites</Link></li>
            </ul>

            <ul>
                {!!auth.user && <li><Link reloadDocument to={'/?filter='+JSON.stringify({seller: auth.user})}>Profile</Link></li>}
                {!!auth.user && <li><Link to='/post'>Post</Link></li>}
                {!!auth.user && <li className='logout-btn' onClick={logout}>Logout</li>}
                {!!auth.user && <li>{auth.user}</li>}

                {!auth.user && <li><Link to='/login'>Login</Link></li>}
                {!auth.user && <li><Link to='/signup'>Sign Up</Link></li>}
            </ul>
        </nav>
    );
}

export default NavBar;