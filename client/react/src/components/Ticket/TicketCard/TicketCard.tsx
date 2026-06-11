import { Link } from "react-router";
import { Ticket } from "@/lib/interfaces";

interface TicketCardProps {
	tickets: Ticket[];
}

const TicketCard = ({ tickets }: TicketCardProps) => {
	return (
		<>
			{tickets.map((item: Ticket) => (
				<div className="result" key={item.id}>
					<p className="kbID">{item.id}</p>
					<p className="kbID" id="reqfor">
						request: {item?.request_for}
					</p>
					<p className="kbID" id="assignedto">
						assigned: {item?.assigned}
					</p>
					<p className="kbTitle">{item?.service_offering}</p>
					<Link to={`/open/ticket?id=${item?.id}`} className="button">
						Open
					</Link>
				</div>
			))}
		</>
	);
};

export default TicketCard;
