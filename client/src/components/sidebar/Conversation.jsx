import {useSocketContext} from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

const Conversation = ({ conversation, lastIdx }) => {
	const {selectedConversation, setSelectedConversation} = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
			${isSelected ? 'bg-stone-700' : ''}`}
			onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? 'online' : ''}`}>
					<div className='w-10 rounded-full'>
						<img
							src={conversation.profilePicture}
							alt='user avatar'
						/>
					</div>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{ conversation.name }</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default Conversation;