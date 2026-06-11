import { Ticket } from "@/lib/interfaces";

interface TicketCardProps {
	tickets: Ticket[];
}

const statusTone = (status: string) =>
	status?.startsWith("pending") ? "pending" : status || "new";

const TicketCard = ({ tickets }: TicketCardProps) => {
	return (
		<>
			{tickets.map((item: Ticket) => (
				<div className="ticket-card" key={item.id}>
					<div className="ticket-card__top">
						<span className="ticket-card__id">INC · #{item.id}</span>
						<span className={`status-pill tone-${statusTone(item.status)}`}>
							{item.status || "new"}
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
				</div>
			))}
		</>
	);
};

export default TicketCard;
