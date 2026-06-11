import './sidebar.css'
import { useState } from "react";
import { useSearchParams } from "react-router";
import { PanelLeft } from "lucide-react";
import MenuBar from '../Menu/MenuBar'

const Navbar = () => {
	const [searchParams] = useSearchParams();
	const username = searchParams.get('username') ?? "";

	// Navbar state for sidebar
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
