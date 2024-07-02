import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const { setAuthUser } = useAuthContext();
 
  const signup = async (inputs) => {
    const success = handleInputErrors(inputs);
    if(!success) return;

    setLoading(true);

    try{
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputs)
      })

      const data = await res.json();
      if(data.error){
        toast.error(data.error);
        throw new Error(data.error);
      }
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        localStorage.setItem('user', JSON.stringify(data));
        setAuthUser(data);
      }, 1000);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup, isExploding };
}

export default useSignup

function handleInputErrors(inputs){
  const { name, username, password, confirmPassword } = inputs;
  if(!name || !username || !password || !confirmPassword){
    toast.error('Please fill in all fields');
    return false
  }

  if(password !== confirmPassword) {
    toast.error('Passwords dont match');
    return false
  }

  if(password.length < 6) {
    toast.error('Passwords must be at least 6 characters');
    return false
  }

  return true
};