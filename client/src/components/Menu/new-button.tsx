import { useState } from "react";
import { NavLink } from "react-router";
import { Plus, SquarePen, BookPlus } from "lucide-react";

interface NewButtonProps {
	onNavigate?: () => void;
}

const NewButton = ({ onNavigate }: NewButtonProps) => {
	const [open, setOpen] = useState(false);

	const handlePick = () => {
		setOpen(false);
		onNavigate?.();
	};

	return (
		<div className="new-wrap">
			<button
				type="button"
				className={open ? "new-btn open" : "new-btn"}
				onClick={() => setOpen((v) => !v)}
				title="Create new"
				aria-expanded={open}
			>
				<Plus className="icon" size={18} />
				<span className="text nav-text">New</span>
			</button>

			{open && (
				<>
					{/* click-catcher to close when clicking elsewhere */}
					<div className="new-overlay" onClick={() => setOpen(false)} />
					<div className="new-menu" role="menu">
						<NavLink to="/new/ticket" onClick={handlePick}>
							<SquarePen size={16} />
							New incident
						</NavLink>
						<NavLink to="/new/knowledge" onClick={handlePick}>
							<BookPlus size={16} />
							New KB
						</NavLink>
					</div>
				</>
			)}
		</div>
	);
};

export default NewButton;
