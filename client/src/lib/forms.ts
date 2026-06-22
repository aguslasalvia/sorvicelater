import * as Interface from "./interfaces";
import { TicketStatus } from "./constants";

export const loginForm: Interface.Login = {
	username: "",
	password: ""
};

export const KnowledgeBaseForm: Interface.Knowledge = {
	id: 0,
	title: "",
	description: "",
};

export const TicketBaseForm: Interface.Ticket = {
	request_by: "",
	request_for: "",
	service_offering: "",
	item: "",
	contact_type: "",
	status: TicketStatus.New,
	assigned: "",
	category: "",
	symptom: "",
	impact: "",
	urgency: "",
	priority: "",
	description: "",
	worknotes: "",
	additional: "",
	kb: 0,
};
