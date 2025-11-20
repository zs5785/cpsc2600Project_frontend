import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/variables.css'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Unknow from './pages/Unknow';
import Userauth from './pages/Userauth';
import Profile from './pages/Profile';
import AuthProvider from './contexts/AuthProvider';
import AddItem from './pages/Admin/AddItem';
import { nanoid } from 'nanoid';
import ItemPost from './pages/ItemPost';

function App() {
  return (
    <>
      <AuthProvider>
        <header className='container'>
          <NavBar />
        </header>
        <main>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/signup' element={<Userauth isSignup={true} key={nanoid()} />} />
                <Route path='/login' element={<Userauth key={nanoid()} />} />
                <Route path='/user' Component={Profile} />
                <Route path='/additem' Component={AddItem} />
                <Route path='/post' Component={ItemPost}/>
                <Route Component={Unknow} />
            </Routes>
        </main>
      </AuthProvider>
      <footer>
        <div>By Tong Yu Hei</div>
        <a href="mailto:zssniper5785@gmail.com">zssniper5785@gmail.com</a>
      </footer>
    </>
  );
}

export default App;
