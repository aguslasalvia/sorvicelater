import "styles/searchbar.css";
import { Search, X } from "lucide-react";

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
			{value && (
				<button
					type="button"
					className="searchbar__clear"
					aria-label="Clear search"
					onClick={() => onChange("")}
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
