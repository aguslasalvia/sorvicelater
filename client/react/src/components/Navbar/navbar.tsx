import 'styles/sidebar.css'
import { useState } from "react";
import { useSearchParams } from "react-router";
import { PanelLeft } from "lucide-react";
import MenuBar from '../Menu/menu-bar'

const Navbar = () => {
	const [searchParams] = useSearchParams();
	const username = searchParams.get('username') ?? "";

	// Navbar state for sidebar — collapsed on load
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<nav className={isSidebarOpen ? "sidebar" : "sidebar close"}>
			<div className="sidebar-top">
				<button
					className="collapse-btn"
					onClick={toggleSidebar}
					aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
				>
					<PanelLeft size={20} />
				</button>
			</div>
			<MenuBar query={username} />
		</nav>
	)
}

export default Navbar;
