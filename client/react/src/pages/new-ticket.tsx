import "styles/ticket.css";
import TicketForm from "@/components/Ticket/TicketForm/ticket-form";
import { TicketBaseForm } from "@/lib/forms"

const NewTicket = () => {
	return <TicketForm props={TicketBaseForm} />;
};

export default NewTicket;
