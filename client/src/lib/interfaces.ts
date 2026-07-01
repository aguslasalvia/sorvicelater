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

export interface Category {
	id: number;
	name: string;
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
	assigned_id: number | null;
	assigned_user?: User | null;
	category_id: number | null;
	category?: Category | null;
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
