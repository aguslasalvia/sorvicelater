import "styles/incidents.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Inbox, Plus } from "lucide-react";
import TicketCard from "@/components/Ticket/TicketCard/ticket-card";
import SearchBar from "@/components/SearchBar/search-bar";
import LoadingState from "@/components/LoadingState/loading-state";
import { fetchAllTickets } from "@/lib/fetch";
import { Ticket } from "@/lib/interfaces";
import { STATE_OPTIONS, TicketStatus } from "@/lib/constants";
import { ticketMatchesQuery } from "@/lib/search";

const Incidents = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stateFilter, setStateFilter] = useState<TicketStatus | "">("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      setTickets(await fetchAllTickets());
      setLoading(false);
    };
    getTickets();
  }, []);

  const filteredTickets = tickets.filter(
    (t) =>
      (stateFilter === "" || t.status === stateFilter) &&
      ticketMatchesQuery(t, query),
  );

  return (
    <div className="content page-incidents">
      <header className="inc-header">
        <div>
          <h1 className="inc-title">Incidents</h1>
          <p className="inc-subtitle">All reported incidents</p>
        </div>
        <div className="inc-header-actions">
          <select
            className="inc-state-filter"
            value={stateFilter}
            onChange={(e) =>
              setStateFilter(
                e.target.value === ""
                  ? ""
                  : (Number(e.target.value) as TicketStatus),
              )
            }
            aria-label="Filter by state"
          >
            <option value="">All states</option>
            {STATE_OPTIONS.map((state) => (
              <option value={state.value} key={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <Link to="/new/ticket" className="inc-new-btn">
            <Plus size={16} /> New incident
          </Link>
        </div>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search incidents by description, category, assignee…"
      />

      {loading ? (
        <LoadingState label="Loading incidents…" />
      ) : filteredTickets.length === 0 ? (
        <div className="inc-empty">
          <div className="inc-empty-icon">
            <Inbox size={30} />
          </div>
          <p className="inc-empty-title">
            {query !== "" || stateFilter !== ""
              ? "No incidents match your search"
              : "No incidents yet"}
          </p>
          <p className="inc-empty-text">
            {query !== "" || stateFilter !== ""
              ? "Try a different term, state, or clear the filters."
              : "Reported incidents will show up here."}
          </p>
        </div>
      ) : (
        <div className="resultsWrapper">
          <TicketCard tickets={filteredTickets} />
        </div>
      )}
    </div>
  );
};

export default Incidents;
