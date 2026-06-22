import 'styles/sidebar.css'
import { useState } from "react";
import { PanelLeft, Menu as MenuIcon } from "lucide-react";
import MenuBar from '../Menu/menu-bar'

const Navbar = () => {
	// Navbar state for sidebar — collapsed on load
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<>
			{/* Hamburger — only shown on mobile, opens the drawer */}
			<button
				className="mobile-hamburger"
				onClick={toggleSidebar}
				aria-label="Open menu"
			>
				<MenuIcon size={22} />
			</button>

			{/* Backdrop — tap to close the drawer (mobile only) */}
			<div
				className={isSidebarOpen ? "sidebar-backdrop show" : "sidebar-backdrop"}
				onClick={closeSidebar}
			/>

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
				<MenuBar onNavigate={closeSidebar} />
			</nav>
		</>
	)
}

export default Navbar;
