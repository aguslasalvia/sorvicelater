import { Ticket } from "./interfaces";

// Free-text match across the searchable fields of a ticket.
export const ticketMatchesQuery = (ticket: Ticket, query: string): boolean => {
	const q = query.trim().toLowerCase();
	if (q === "") return true;
	return [
		ticket.description,
		ticket.category,
		ticket.service_offering,
		ticket.symptom,
		ticket.request_for,
		ticket.request_by,
		ticket.assigned,
		ticket.item,
		String(ticket.id ?? ""),
	].some((field) => (field ?? "").toString().toLowerCase().includes(q));
};
