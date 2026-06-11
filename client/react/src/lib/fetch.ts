import * as Interfaces from "./interfaces"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// --------------------------------------- //
//								User                    //
// --------------------------------------- //

export const fetchLogin = async (body: Interfaces.Login) => {
	const response = await fetch(`${API_BASE_URL}/auth/platform`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}
	)

	return response.status == 404 ? 404 : response.status == 500 ? 500 : await response.json()
};


export const fetchAllAdmins = async () => {
	const response = await fetch(`${API_BASE_URL}/user/all_users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})

	const data = await response.json()
	return data;
}


// --------------------------------------- //
//								Ticket
// --------------------------------------- //
export const fetchTicketStateCounters = async () => {
	const response = await fetch(`${API_BASE_URL}/ticket/counters`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})
	return await response.json()
}


export const fetchAllTickets = async (): Promise<Interfaces.Ticket[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/ticket/all`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})
		if (!response.ok) return []
		return await response.json()
	} catch {
		return []
	}
}


// --------------------------------------- //
//							Knowledge
// --------------------------------------- //

export const fetchCountKnowledge = async () => {
	const response = await fetch(`${API_BASE_URL}/knowledge/count`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	})

	return await response.json()
}


export const fetchKnowledge = async (body: Interfaces.Knowledge) => {
	const response = await fetch(`${API_BASE_URL}/knowledge/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	return response.status == 404 ? 404 : response.status == 500 ? 500 : await response.json()
}


export const fetchAllKnowledge = async (): Promise<Interfaces.Knowledge[]> => {
	const response = await fetch(`${API_BASE_URL}/knowledge/all`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
	return response.json();
}
