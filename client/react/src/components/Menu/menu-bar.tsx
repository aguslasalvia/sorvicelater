import { Link } from "react-router";
import { LogOut } from "lucide-react";
import Menu from './menu'

const MenuBar = () => {
	return (
		<div className="menu-bar">
			<Menu />
			<div className="bottom-content">
				<li>
					<Link to="/" title="Logout">
						<LogOut className="icon" size={18} />
						<span className="text nav-text">Logout</span>
					</Link>
				</li>
			</div>
		</div>
	)
}

export default MenuBar;
