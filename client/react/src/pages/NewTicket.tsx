import "./ticket.css";
import TicketForm from "@/components/Ticket/TicketForm/TicketForm";
import { TicketBaseForm } from "@/lib/forms"

const NewTicket = () => {
	return <TicketForm props={TicketBaseForm} />;
};

export default NewTicket;
