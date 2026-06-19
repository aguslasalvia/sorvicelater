import { NavLink } from "react-router";
import {
	SquarePen,
	BookPlus,
	Archive,
	UserRound,
	BookMarked,
	BarChart3,
	Search,
	type LucideIcon,
} from "lucide-react";

type NavItem = {
	href: string
	icon: LucideIcon
	text: string
}

const links: NavItem[] = [
	{ href: "/new/ticket", icon: SquarePen, text: "New incident" },
	{ href: "/new/knowledge", icon: BookPlus, text: "New KB" },
	{ href: "/lists/allTickets", icon: Archive, text: "Incidents" },
	{ href: "/lists/myTickets", icon: UserRound, text: "My incidents" },
	{ href: "/lists/knowledge", icon: BookMarked, text: "KB articles" },
	{ href: "/backlog", icon: BarChart3, text: "Backlog" },
]

const Menu = () => {
	return (
		<div className="menu">
			{/* <!-- Searchbox --> */}
			<li className="search-box" title="Search">
				{/* <!-- PARA BUSCAR KB O INC --> */}
				<Search className="icon" size={18} />
				<input type="text" name="Search" placeholder="Search KB, INC" />
			</li>

			<ul className="menu-links">
				{
					// Auto create all links (<a> tags)
					links.map((link, index) => {
						const Icon = link.icon;
						return (
							<li key={index} className="nav-link">
								<NavLink
									to={link.href}
									title={link.text}
									className={({ isActive }) => (isActive ? "active" : undefined)}
								>
									<Icon className="icon" size={18} />
									<span className="text nav-text">{link.text}</span>
								</NavLink>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default Menu;
