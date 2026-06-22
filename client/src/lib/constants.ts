// Numeric enum (C#-style) — mirrors the backend. The DB stores the number.
export enum TicketStatus {
	New, // 0
	Pending, // 1
	Resolved, // 2
}

export const STATE_OPTIONS: { value: TicketStatus; label: string }[] = [
	{ value: TicketStatus.New, label: "New" },
	{ value: TicketStatus.Pending, label: "Pending" },
	{ value: TicketStatus.Resolved, label: "Resolved" },
];

// number -> label, for displaying a stored status
export const statusLabel = (status: TicketStatus): string =>
	STATE_OPTIONS.find((s) => s.value === status)?.label ?? "Unknown";
