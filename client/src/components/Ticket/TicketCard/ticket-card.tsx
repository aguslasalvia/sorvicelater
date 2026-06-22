import "./ticket-card.css";
import { Link } from "react-router";
import { Ticket } from "@/lib/interfaces";
import { TicketStatus, statusLabel } from "@/lib/constants";

interface TicketCardProps {
	tickets: Ticket[];
}

const STATUS_TONE: Record<TicketStatus, string> = {
	[TicketStatus.New]: "new",
	[TicketStatus.Pending]: "pending",
	[TicketStatus.Resolved]: "resolved",
};

const TicketCard = ({ tickets }: TicketCardProps) => {
	return (
		<>
			{tickets.map((item: Ticket) => (
				<Link className="ticket-card" to={`/ticket/${item.id}`} key={item.id}>
					<div className="ticket-card__top">
						<span className="ticket-card__id">INC · #{item.id}</span>
						<span className={`status-pill tone-${STATUS_TONE[item.status]}`}>
							{statusLabel(item.status)}
						</span>
					</div>

					<p className="ticket-card__title">
						{item.service_offering || "Untitled incident"}
					</p>

					<div className="ticket-card__meta">
						<span>
							<span className="muted">For</span> {item.request_for || "—"}
						</span>
						<span>
							<span className="muted">Assignee</span> {item.assigned || "Unassigned"}
						</span>
					</div>
				</Link>
			))}
		</>
	);
};

export default TicketCard;
