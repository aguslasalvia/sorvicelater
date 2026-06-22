import "styles/searchbar.css";
import { Search } from "lucide-react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search…" }: SearchBarProps) => {
	return (
		<div className="searchbar">
			<Search size={18} className="searchbar__icon" />
			<input
				type="text"
				className="searchbar__input"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default SearchBar;
