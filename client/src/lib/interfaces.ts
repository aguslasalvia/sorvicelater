export interface Login {
	username: string,
	password: string
}

export interface User {
	id: number,
	username: string;
	first_name: string,
	email: string,
	password: string;
}

export interface Knowledge {
	id: number,
	title: string;
	description: string;
}

import { TicketStatus } from "./constants";

export interface Ticket {
	id?: number;
	request_by: string;
	request_for: string;
	service_offering: string;
	item: string;
	contact_type: string;
	status: TicketStatus;
	assigned: string;
	category: string;
	symptom: string;
	impact: string;
	urgency: string;
	priority: string;
	description: string;
	worknotes: string;
	additional: string;
	kb: number;
	created_at?: string;
}
