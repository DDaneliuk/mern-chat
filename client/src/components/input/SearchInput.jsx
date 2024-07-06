import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
	const [search, setSearch] = useState('');

	const handleSubmit = () => {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 w-[100%]'>
			<label className="input h-10 p-4 flex items-center gap-2 w-[100%]">
				<IoSearchSharp className='w-5 h-5 outline-none' />
  			<input 
					type="text" 
					className="grow" 
					placeholder="Search chats"
					value={search}
					onChange={(e) => setSearch(e.target.value)} />
			</label>
		</form>
	);
};
export default SearchInput;