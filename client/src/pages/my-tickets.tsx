import "styles/mytickets.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Inbox, Plus } from "lucide-react";
import TicketCard from "@/components/Ticket/TicketCard/ticket-card";
import SearchBar from "@/components/SearchBar/search-bar";
import LoadingState from "@/components/LoadingState/loading-state";
import { fetchUserTickets } from "@/lib/fetch";
import { ticketMatchesQuery } from "@/lib/search";
import { Ticket } from "@/lib/interfaces";

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // login stores the username as a plain string in localStorage
  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    const getTickets = async () => {
      const all = await fetchUserTickets();
      setTickets(
        all.filter(
          (t) =>
            t.assigned_user?.username === username || t.request_by === username,
        ),
      );
      setLoading(false);
    };
    getTickets();
  }, [username]);

  const filtered = tickets.filter((t) => ticketMatchesQuery(t, query));

  return (
    <div className="content page-mytickets">
      <header className="mt-header">
        <div>
          <h1 className="mt-title">My incidents</h1>
          <p className="mt-subtitle">
            Incidents you reported or are assigned to
          </p>
        </div>
        <Link to="/new/ticket" className="mt-new-btn">
          <Plus size={16} /> New incident
        </Link>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search your incidents…"
      />

      <span className="mt-limit-badge">
        Only the last 15 incidents are shown
      </span>

      {loading ? (
        <LoadingState label="Loading your incidents…" />
      ) : filtered.length === 0 ? (
        <div className="mt-empty">
          <div className="mt-empty-icon">
            <Inbox size={30} />
          </div>
          <p className="mt-empty-title">
            {query !== ""
              ? "No incidents match your search"
              : "Nothing here yet"}
          </p>
          <p className="mt-empty-text">
            {query !== ""
              ? "Try a different term or clear the search."
              : "Incidents you create or get assigned to will show up here."}
          </p>
          <Link to="/new/ticket" className="mt-empty-btn">
            <Plus size={16} /> New incident
          </Link>
        </div>
      ) : (
        <div className="resultsWrapper">
          <TicketCard tickets={filtered} />
        </div>
      )}
    </div>
  );
};

export default MyTickets;
