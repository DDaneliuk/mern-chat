import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import Input from "../input/SearchInput";
import { useAuthContext } from '../../context/AuthContext';
import { HiOutlineDotsVertical } from "react-icons/hi";
import useConversation from "../../zustand/useConversation";

const Sidebar = () => {
	const {authUser} = useAuthContext();
	const { selectedConversation } = useConversation();
	const profilePic = authUser?.profilePicture ? authUser?.profilePicture : null;
	const profileLetterName = authUser.name.charAt(0).toUpperCase();

	return (
		<div className={`sm:w-[300px] w-[100%] border-slate-500 flex p-3 flex-col ${selectedConversation ? 'hidden sm:flex' : null}`}>
			<div className="flex justify-between items-center mb-4">
				{profilePic ?
					<div className='w-10 rounded-full'>
						<img src={profilePic} alt='user profile picture'/> 
					</div>
				: 
				<div className="avatar placeholder">
					<div className="bg-neutral text-neutral-content w-10 rounded-full">
						<span className="text-1xl">{profileLetterName}</span>
					</div>
				</div>}
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn min-h-9 h-9 px-3"><HiOutlineDotsVertical /></div>
					<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
						<li><a>Settings</a></li>
						<li><a>Log out</a></li>
					</ul>
				</div>
			</div>
			<Input />
			<div className='divider'></div>
			<Conversations />
			<LogoutBtn />
		</div>
	);
};
export default Sidebar;