import toast from "react-hot-toast";
import * as Interfaces from "./interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Headers for authenticated requests: JSON + the JWT as a Bearer token.
// The token is stored raw at login, so we read it directly (no JSON.parse).
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// --------------------------------------- //
//								User                     //
// --------------------------------------- //

export const fetchLogin = async (body: Interfaces.Login) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/platform`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status == 404) {
      toast.error("User not found");
      return 404;
    }
    if (response.status == 500) {
      toast.error("Server error");
      return 500;
    }

    toast.success(`Welcome back, ${body.username}`);
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return 500;
  }
};

export const fetchAllAdmins = async () => {
  const response = await fetch(`${API_BASE_URL}/user/staff`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await response.json();
  return data;
};

// --------------------------------------- //
//								Ticket									 //
// --------------------------------------- //
export const fetchCreateTicket = async (body: Interfaces.Ticket) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status == 401) {
      toast.error("User not authorized");
      return 401;
    }
    if (response.status == 500) {
      toast.error("Server error");
      return 500;
    }

    toast.success("Ticket created");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return 500;
  }
};

export const fetchTickets = async (): Promise<Interfaces.Ticket[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchUserTickets = async (): Promise<Interfaces.Ticket[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket/assigned`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchTicketById = async (
  id: string,
): Promise<Interfaces.Ticket | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return null;
  }
};

export const fetchTicketStateCounters = async () => {
  const response = await fetch(`${API_BASE_URL}/ticket/backlog`, {
    method: "GET",
    headers: authHeaders(),
  });
  return await response.json();
};

export type Efficiency = {
  under24h: number;
  under72h: number;
  over72h: number;
};

export const fetchTicketEfficiency = async (): Promise<Efficiency> => {
  const empty: Efficiency = { under24h: 0, under72h: 0, over72h: 0 };
  try {
    const response = await fetch(`${API_BASE_URL}/ticket/efficiency`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return empty;
    return await response.json();
  } catch {
    return empty;
  }
};

export const fetchLastTickets = async (): Promise<Interfaces.Ticket[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket/last`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchUpdateTicket = async (
  id: number,
  body: Partial<Interfaces.Ticket>,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ticket/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status == 401) {
      toast.error("User not authorized");
      return 401;
    }
    if (!response.ok) {
      toast.error("Could not update the incident");
      return null;
    }

    toast.success("Incident updated");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return null;
  }
};

// --------------------------------------- //
//							Category                   //
// --------------------------------------- //

export const fetchCategories = async (): Promise<Interfaces.Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchCreateCategory = async (
  name: string,
): Promise<Interfaces.Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      toast.error("Could not create the category");
      return null;
    }
    toast.success("Category created");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return null;
  }
};

export const fetchUpdateCategory = async (
  id: number,
  name: string,
): Promise<Interfaces.Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      toast.error("Could not update the category");
      return null;
    }
    toast.success("Category updated");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return null;
  }
};

export const fetchDeleteCategory = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) {
      toast.error("Could not delete the category");
      return false;
    }
    toast.success("Category deleted");
    return true;
  } catch {
    toast.error("Could not reach the server");
    return false;
  }
};

// --------------------------------------- //
//							Knowledge                  //
// --------------------------------------- //

export const fetchCountKnowledge = async (): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/knowledge/count`, {
    method: "GET",
    headers: authHeaders(),
  });

  return await response.json();
};

export const fetchKnowledge = async (body: Interfaces.Knowledge) => {
  try {
    const response = await fetch(`${API_BASE_URL}/knowledge`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (response.status == 404) {
      toast.error("User not found");
      return 404;
    }
    if (response.status == 500) {
      toast.error("Server error");
      return 500;
    }

    toast.success("Article saved");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return 500;
  }
};

export const fetchAllKnowledge = async (): Promise<Interfaces.Knowledge[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/knowledge/all`, {
      method: "GET",
      headers: authHeaders(),
    });
    return response.json();
  } catch {
    return [];
  }
};

export const fetchUpdateKnowledge = async (
  id: number,
  body: Partial<Interfaces.Knowledge>,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/knowledge/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error("Could not update the article");
      return null;
    }

    toast.success("Article updated");
    return await response.json();
  } catch {
    toast.error("Could not reach the server");
    return null;
  }
};
