import { Link } from "react-router";
import { LogOut } from "lucide-react";
import Menu from './menu'

interface MenuBarProps {
	onNavigate?: () => void
}

const MenuBar = ({ onNavigate }: MenuBarProps) => {
	return (
		<div className="menu-bar">
			<Menu onNavigate={onNavigate} />
			<div className="bottom-content">
				<li>
					<Link to="/" title="Logout" onClick={onNavigate}>
						<LogOut className="icon" size={18} />
						<span className="text nav-text">Logout</span>
					</Link>
				</li>
			</div>
		</div>
	)
}

export default MenuBar;
