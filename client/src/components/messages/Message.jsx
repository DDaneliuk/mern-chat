const Message = ({ message }) => {
	return (
		<div>
			<div className='chat-image avatar chat-end'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component'/>
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2`}></div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'></div>
		</div>
	);
};
export default Message;