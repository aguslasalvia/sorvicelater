import "styles/mytickets.css";
import { Link } from "react-router";
import { Inbox, Plus } from "lucide-react";

const MyTickets = () => {
	return (
		<div className="content page-mytickets">
			<header className="mt-header">
				<h1 className="mt-title">My incidents</h1>
				<p className="mt-subtitle">Incidents you reported or are assigned to</p>
			</header>

			<div className="mt-empty">
				<div className="mt-empty-icon">
					<Inbox size={30} />
				</div>
				<p className="mt-empty-title">Nothing here yet</p>
				<p className="mt-empty-text">
					Incidents you create or get assigned to will show up here.
				</p>
				<Link to="/new/ticket" className="mt-empty-btn">
					<Plus size={16} /> New incident
				</Link>
			</div>
		</div>
	);
};

export default MyTickets;
