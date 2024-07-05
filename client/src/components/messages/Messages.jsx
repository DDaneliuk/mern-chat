import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages = () => {
	const {loading, messages} = useGetMessages();
	const lastMessageRef = useRef();

	useEffect(()=> {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 100)
	}, [messages])

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && 
				messages.length > 0 && 
				messages.map((message) => (
				<div key={message._id}
					ref={lastMessageRef}
				>
					<Message key={message._id} message={message} />
				</div>
			))}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<div className='px-4 flex-1 flex overflow-auto justify-center items-center h-full flex-col'>
					<h2 className="text-2xl text-white">Say Hello!</h2>
					<p className='text-center'>Send a message to start the conversation</p>
				</div>
			)}
		</div>
	);
};
export default Messages;