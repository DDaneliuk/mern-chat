import { useAuthContext } from '../../context/AuthContext';
import { extrackTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
	const {authUser} = useAuthContext(); 
	const { selectedConversation } = useConversation();
	const fomattedTime = extrackTime(message.createdAt);
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? null : selectedConversation.profilePicture;
	const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
			{profilePic ?
				<div className='w-10 rounded-full'>
					 <img src={profilePic} alt='user profile picture'/> 
				</div>
			: null }
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>{ message.message }</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{fomattedTime}</div>
		</div>
	);
};
export default Message;