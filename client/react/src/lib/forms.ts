import * as Interface from "./interfaces";

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
	id: 0,
	request_by: "",
	request_for: "",
	service_offering: "",
	item: "",
	contact_type: "",
	status: "",
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
