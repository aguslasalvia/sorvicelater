import { NavLink } from "react-router";
import {
  Archive,
  UserRound,
  BookMarked,
  BarChart3,
  Search,
  type LucideIcon,
} from "lucide-react";
import NewButton from "./new-button";

type NavItem = {
  href: string;
  icon: LucideIcon;
  text: string;
};

const links: NavItem[] = [
  { href: "/backlog", icon: BarChart3, text: "Backlog" },
  { href: "/lists/all-tickets", icon: Archive, text: "Incidents" },
  { href: "/lists/my-tickets", icon: UserRound, text: "My incidents" },
  { href: "/lists/knowledge", icon: BookMarked, text: "KB articles" },
];

interface MenuProps {
  onNavigate?: () => void;
}

const Menu = ({ onNavigate }: MenuProps) => {
  return (
    <div className="menu">
      {/* Primary create action */}
      <NewButton onNavigate={onNavigate} />

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
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <Icon className="icon" size={18} />
                  <span className="text nav-text">{link.text}</span>
                </NavLink>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Menu;
