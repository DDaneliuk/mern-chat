import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";
import Input from "../input/SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<Input />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutBtn />
		</div>
	);
};
export default Sidebar;