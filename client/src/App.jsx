import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster }  from 'react-hot-toast';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { useAuthContext } from '../src/context/AuthContext';
import "./App.css";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='sm:p-4 flex items-center justify-center h-dvh'>
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to="/login" /> }/>
        <Route path='/login' element={ authUser ? <Navigate to="/" /> : <Login /> }/>
        <Route path='/signup' element={ authUser ? <Navigate to="/" /> : <Signup /> }/>
      </Routes> 
      <Toaster />
    </div>
  )
}

export default App
