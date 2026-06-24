import { Link } from "react-router";
import { LogOut } from "lucide-react";
import { storage } from "@/lib/storage";
import Menu from './menu'

interface MenuBarProps {
	onNavigate?: () => void
}

const MenuBar = ({ onNavigate }: MenuBarProps) => {
	const handleLogout = () => {
		storage.remove("token");
		storage.remove("username");
		onNavigate?.();
	};

	return (
		<div className="menu-bar">
			<Menu onNavigate={onNavigate} />
			<div className="bottom-content">
				<li>
					<Link to="/" title="Logout" onClick={handleLogout}>
						<LogOut className="icon" size={18} />
						<span className="text nav-text">Logout</span>
					</Link>
				</li>
			</div>
		</div>
	)
}

export default MenuBar;
