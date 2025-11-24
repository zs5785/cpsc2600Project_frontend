import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function NavBar(){
    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState(auth.user);

    useEffect(()=>{
        setUsername(auth.user);
    }, [auth])

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
                {!!username && <li><Link reloadDocument to={'/?filter='+JSON.stringify({seller: username})}>My Posts</Link></li>}
                {!!username && <li><Link to='/post'>Post</Link></li>}
                {!!username && <li className='logout-btn' onClick={logout}>Logout</li>}
                {!!username && <li>{username}</li>}

                {!username && <li><Link to='/login'>Login</Link></li>}
                {!username && <li><Link to='/signup'>Sign Up</Link></li>}
            </ul>
        </nav>
    );
}

export default NavBar;