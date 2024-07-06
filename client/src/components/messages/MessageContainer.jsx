import {useEffect} from 'react';
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { IoIosArrowBack } from "react-icons/io";
import {useSocketContext} from '../../context/SocketContext';

const MessageContainer = () => {
	const {onlineUsers} = useSocketContext();
	const { selectedConversation, setSelectedConversation } = useConversation();
	console.log('selectedConversation', selectedConversation);
	const isOnline = onlineUsers.includes(selectedConversation?._id);


	useEffect(() => {
		// cleanup function
		return () => setSelectedConversation(null);
	}, [setSelectedConversation])

	return (
		<div className={`w-[100%] flex flex-col bg-zinc-900 rounded-2xl ${!selectedConversation ? 'hidden sm:flex' : null}`}>
			{ !selectedConversation ? (
				<NoChatSelected />
			) : 
			<>
				<div className='flex items-center bg-zinc-800 px-4 py-2 mb-2 rounded-2xl'>
					<div 
						role="button" 
						className="btn min-h-9 h-9 px-3 mr-4" 
						onClick={() => setSelectedConversation(null)}>
							<IoIosArrowBack />
					</div>
					<div className="flex flex-col">
						<span className='text-slate-50 font-bold'>{selectedConversation.name}</span>
						{isOnline ? <span className='text-green-500 text-xs'>online</span> : <span className='text-rose-500 text-xs'>offline</span>}
					</div>
				</div>

				<Messages />
				<MessageInput />
			</>
			}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
			  <p className="text-2xl text-white">Welcome 👋</p>
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};