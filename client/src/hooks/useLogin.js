import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);

    const checkingData = handleInputErrors(username, password);

    if(!checkingData) return;

    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }

      localStorage.setItem('user', JSON.stringify(data));
      setAuthUser(data);

    } catch(e){
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;

function handleInputErrors(username, password){
  if(!username){
    toast.error('Please fill in username field');
    return false
  }

  if(!password){
    toast.error('Please fill in username field');
    return false
  }

  return true
};