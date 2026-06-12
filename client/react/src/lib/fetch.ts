import toast from "react-hot-toast"
import * as Interfaces from "./interfaces"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// --------------------------------------- //
//								User                    //
// --------------------------------------- //

export const fetchLogin = async (body: Interfaces.Login) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/platform`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			}
		)

		if (response.status == 404) {
			toast.error("User not found")
			return 404
		}
		if (response.status == 500) {
			toast.error("Server error")
			return 500
		}

		toast.success(`Welcome back, ${body.username}`)
		return await response.json()
	} catch {
		toast.error("Could not reach the server")
		return 500
	}
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
	const response = await fetch(`${API_BASE_URL}/ticket/backlog`, {
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
	try {
		const response = await fetch(`${API_BASE_URL}/knowledge/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})

		if (response.status == 404) {
			toast.error("User not found")
			return 404
		}
		if (response.status == 500) {
			toast.error("Server error")
			return 500
		}

		toast.success("Article saved")
		return await response.json()
	} catch {
		toast.error("Could not reach the server")
		return 500
	}
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
