import "styles/incidents.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Inbox, Plus } from "lucide-react";
import TicketCard from "@/components/Ticket/TicketCard/ticket-card";
import { fetchAllTickets } from "@/lib/fetch";
import { Ticket } from "@/lib/interfaces";

const Incidents = () => {
	const [tickets, setTickets] = useState<Ticket[]>([]);

	useEffect(() => {
		const getTickets = async () => {
			setTickets(await fetchAllTickets());
		};
		getTickets();
	}, []);

	return (
		<div className="content page-incidents">
			<header className="inc-header">
				<div>
					<h1 className="inc-title">Incidents</h1>
					<p className="inc-subtitle">All reported incidents</p>
				</div>
				<Link to="/new/ticket" className="inc-new-btn">
					<Plus size={16} /> New incident
				</Link>
			</header>

			{tickets.length === 0 ? (
				<div className="inc-empty">
					<div className="inc-empty-icon">
						<Inbox size={30} />
					</div>
					<p className="inc-empty-title">No incidents yet</p>
					<p className="inc-empty-text">Reported incidents will show up here.</p>
				</div>
			) : (
				<div className="resultsWrapper">
					<TicketCard tickets={tickets} />
				</div>
			)}
		</div>
	);
};

export default Incidents;
