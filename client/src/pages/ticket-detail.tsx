import "styles/ticketdetail.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Pencil } from "lucide-react";
import TicketForm from "@/components/Ticket/TicketForm/ticket-form";
import { fetchTicketById } from "@/lib/fetch";
import { Ticket } from "@/lib/interfaces";
import { TicketStatus, statusLabel } from "@/lib/constants";

const STATUS_TONE: Record<TicketStatus, string> = {
  [TicketStatus.New]: "new",
  [TicketStatus.Pending]: "pending",
  [TicketStatus.Resolved]: "resolved",
};

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const load = async () => {
    if (!id) return;
    const data = await fetchTicketById(id);
    setTicket(data && data.id ? data : null);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="content page-ticketdetail">
        <p className="td-state">Loading…</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="content page-ticketdetail">
        <Link to="/lists/all-tickets" className="td-back">
          <ArrowLeft size={16} /> Back to incidents
        </Link>
        <p className="td-state">Incident not found.</p>
      </div>
    );
  }

  if (editing) {
    return (
      <TicketForm
        props={ticket}
        onCancel={() => setEditing(false)}
        onSaved={async () => {
          await load();
          setEditing(false);
        }}
      />
    );
  }

  const opened = ticket.created_at
    ? new Date(ticket.created_at).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const details: { label: string; value?: string }[] = [
    { label: "Priority", value: ticket.priority },
    { label: "Impact", value: ticket.impact },
    { label: "Urgency", value: ticket.urgency },
    { label: "Category", value: ticket.category?.name },
    { label: "Symptom", value: ticket.symptom },
    { label: "Service offering", value: ticket.service_offering },
    { label: "Configuration item", value: ticket.item },
    { label: "Contact type", value: ticket.contact_type },
  ];

  return (
    <div className="content page-ticketdetail">
      <Link to="/lists/all-tickets" className="td-back">
        <ArrowLeft size={16} /> Back to incidents
      </Link>

      {/* ===== Hero ===== */}
      <section className="td-hero">
        <div className="td-hero__main">
          <span className="td-eyebrow">
            INC · #{ticket.id}
            {opened ? ` · Opened ${opened}` : ""}
          </span>
          <h1 className="td-title">
            {ticket.description || "Untitled incident"}
          </h1>
          <div className="td-people">
            <span>
              <span className="muted">Reported by</span>{" "}
              {ticket.request_by || "—"}
            </span>
            <span>
              <span className="muted">For</span> {ticket.request_for || "—"}
            </span>
            <span>
              <span className="muted">Assignee</span>{" "}
              {ticket.assigned_user?.username || "Unassigned"}
            </span>
          </div>
        </div>

        <div className="td-hero__side">
          <span className={`status-pill tone-${STATUS_TONE[ticket.status]}`}>
            {statusLabel(ticket.status)}
          </span>
          <button
            type="button"
            className="td-edit"
            onClick={() => setEditing(true)}
          >
            <Pencil size={15} /> Edit
          </button>
        </div>
      </section>

      {/* ===== Body ===== */}
      <div className="td-layout">
        <div className="td-main">
          <section className="td-card">
            <p className="td-card__title">Worknotes</p>
            <p className="td-text">
              {ticket.worknotes || (
                <span className="muted">No worknotes added.</span>
              )}
            </p>
          </section>

          <section className="td-card">
            <p className="td-card__title">Additional comments</p>
            <p className="td-text">
              {ticket.additional || (
                <span className="muted">No additional comments.</span>
              )}
            </p>
          </section>
        </div>

        <aside className="td-aside">
          <section className="td-card">
            <p className="td-card__title">Details</p>
            <dl className="td-props">
              {details.map((d) => (
                <div className="td-prop" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;
