import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex gap-x-4 2xl:w-[1450px] w-[100%] h-dvh sm:p-5 py-3 sm:rounded-2xl bg-neutral-900'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;