import { Route, Routes } from 'react-router-dom';
import './css/variables.css'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Unknow from './pages/Unknow';
import Userauth from './pages/Userauth';
import AuthProvider from './contexts/AuthProvider';
import AddItem from './pages/Admin/AddItem';
import { nanoid } from 'nanoid';
import ItemPost from './pages/ItemPost';
import FavouriteProvider from './contexts/FavouriteProvider';
import Favourites from './pages/Favourites';

function App() {
  return (
    <>
      <AuthProvider>
        <FavouriteProvider>
          <header className='container'>
            <NavBar />
          </header>
          <main>
              <Routes>
                  <Route path='/' Component={Home} />
                  <Route path='/signup' element={<Userauth isSignup={true} key={nanoid()} />} />
                  <Route path='/login' element={<Userauth key={nanoid()} />} />
                  <Route path='/additem' Component={AddItem} />
                  <Route path='/post' Component={ItemPost}/>
                  <Route path='/fav' Component={Favourites}/>
                  <Route Component={Unknow} />
              </Routes>
          </main>
        </FavouriteProvider>
      </AuthProvider>
      <footer>
        <div>By Tong Yu Hei</div>
        <a href="mailto:zssniper5785@gmail.com">zssniper5785@gmail.com</a>
      </footer>
    </>
  );
}

export default App;
