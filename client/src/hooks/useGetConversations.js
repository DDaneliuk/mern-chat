import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if(data.error){
          throw new Error(data.error);
        }
        setConversation(data);
      } catch(e){
        toast.error(e.message)
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  }, []);

  return { loading, conversation };
}

export default useGetConversation;