import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Knowledge, User, Ticket } from "@/lib/interfaces";
import {
  fetchAllKnowledge,
  fetchAllAdmins,
  fetchCreateTicket,
  fetchUpdateTicket,
} from "@/lib/fetch";
import { STATE_OPTIONS, TicketStatus } from "@/lib/constants";

interface TicketFormProps {
  props: Ticket;
  // When editing an existing ticket
  onSaved?: () => void;
  onCancel?: () => void;
}

const LEVEL_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const CONTACT_OPTIONS = [
  { value: "Discord", label: "Discord" },
  { value: "ingame", label: "In-game" },
  { value: "other", label: "Other" },
];

const PRIORITY_SCORE: Record<string, number> = { high: 1, medium: 2, low: 3 };

const getPriority = (impact: string, urgency: string) => {
  if (!impact || !urgency) return null;
  const sum = PRIORITY_SCORE[impact] + PRIORITY_SCORE[urgency];
  if (sum <= 2) return { label: "P1 · Critical", level: "critical" };
  if (sum === 3) return { label: "P2 · High", level: "high" };
  if (sum === 4) return { label: "P3 · Moderate", level: "moderate" };
  if (sum === 5) return { label: "P4 · Low", level: "low" };
  return { label: "P5 · Planning", level: "planning" };
};

const TicketForm = ({ props, onSaved, onCancel }: TicketFormProps) => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [knowledges, setKnowledge] = useState<Knowledge[]>([]);
  const [ticket, setTicket] = useState(props);

  const isEdit = props.id !== undefined;

  useEffect(() => {
    const getData = async () => {
      setKnowledge((await fetchAllKnowledge()) || []);
      setAdmins((await fetchAllAdmins()) || []);
    };
    getData();
  }, []);

  // assigned, kb, worknotes, additional y priority quedan opcionales
  const REQUIRED_FIELDS: { key: keyof Ticket; label: string }[] = [
    { key: "description", label: "Short description" },
    { key: "category", label: "Category" },
    { key: "symptom", label: "Symptom" },
    { key: "service_offering", label: "Service offering" },
    { key: "item", label: "Configuration item" },
    { key: "request_by", label: "Requested by" },
    { key: "request_for", label: "Requested for" },
    { key: "status", label: "State" },
    { key: "contact_type", label: "Contact type" },
    { key: "impact", label: "Impact" },
    { key: "urgency", label: "Urgency" },
  ];

  const handleSubmit = async () => {
    const missing = REQUIRED_FIELDS.filter(
      (f) => !String(ticket[f.key] ?? "").trim(),
    );
    if (missing.length) {
      toast.error(`Missing required fields: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    if (isEdit && ticket.id !== undefined) {
      const result = await fetchUpdateTicket(ticket.id, ticket);
      if (result) onSaved?.();
    } else {
      await fetchCreateTicket(ticket);
    }
  };

  const update = (patch: Partial<Ticket>) => setTicket({ ...ticket, ...patch });

  const priority = getPriority(ticket.impact, ticket.urgency);

  return (
    <div className="content page-ticket">
      <header className="form-header">
        <div className="form-heading">
          <span className="form-eyebrow">
            <Sparkles size={13} /> Incident
          </span>
          <h1 className="form-title">
            {isEdit ? `INC · #${ticket.id}` : "New incident"}
          </h1>
          <p className="form-subtitle">
            {isEdit
              ? "Update the details of this incident."
              : "Capture the details and route it to the right team."}
          </p>
        </div>
        <div className="form-actions">
          {onCancel ? (
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          ) : (
            <Link to="/backlog" className="btn-ghost">
              Cancel
            </Link>
          )}
          <button
            id="btnTicketSave"
            className="btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            {isEdit ? "Save changes" : "Save incident"}
          </button>
        </div>
      </header>

      <div className="ticket-layout">
        {/* ===== Main column ===== */}
        <div className="ticket-main">
          {/* --- Summary --- */}
          <section className="form-card card-summary">
            <div className="card-head">
              <div className="card-head-text">
                <p className="section-title">Summary</p>
                <p className="section-hint">
                  What's going on and what's been tried.
                </p>
              </div>
            </div>

            <div className="field">
              <label htmlFor="shortDescI">Short description</label>
              <input
                id="shortDescI"
                className="input-lg"
                name="description"
                type="text"
                value={ticket.description}
                placeholder="Brief summary of the incident"
                onChange={(e) => update({ description: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="worknotes">Worknotes</label>
              <textarea
                id="worknotes"
                name="worknotes"
                value={ticket.worknotes}
                placeholder="What happened, steps taken, findings…"
                onChange={(e) => update({ worknotes: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="addcomments">Additional comments</label>
              <textarea
                id="addcomments"
                name="additional"
                value={ticket.additional}
                placeholder="Notes visible to the requester"
                onChange={(e) => update({ additional: e.target.value })}
              />
            </div>
          </section>

          {/* --- Classification & people --- */}
          <section className="form-card card-full">
            <div className="card-head">
              <div className="card-head-text">
                <p className="section-title">Classification &amp; people</p>
                <p className="section-hint">
                  Categorize the incident and say who it's for.
                </p>
              </div>
            </div>

            <div className="field-grid-2">
              <div className="field">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={ticket.category}
                  placeholder="e.g. Network"
                  onChange={(e) => update({ category: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="symptom">Symptom</label>
                <input
                  id="symptom"
                  name="symptom"
                  type="text"
                  value={ticket.symptom}
                  placeholder="e.g. Cannot connect"
                  onChange={(e) => update({ symptom: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="srvcOf">Service offering</label>
                <input
                  id="srvcOf"
                  name="srvcOf"
                  type="text"
                  value={ticket.service_offering}
                  placeholder="Affected service"
                  onChange={(e) => update({ service_offering: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="confItem">Configuration item</label>
                <input
                  id="confItem"
                  name="confItem"
                  type="text"
                  value={ticket.item}
                  placeholder="Affected asset / CI"
                  onChange={(e) => update({ item: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="reqBy">Requested by</label>
                <input
                  id="reqBy"
                  name="reqBy"
                  type="text"
                  value={ticket.request_by}
                  placeholder="Reporter"
                  onChange={(e) => update({ request_by: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="reqFor">Requested for</label>
                <input
                  id="reqFor"
                  name="reqFor"
                  type="text"
                  value={ticket.request_for}
                  placeholder="Affected user"
                  onChange={(e) => update({ request_for: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>

        {/* ===== Side: properties ===== */}
        <aside className="ticket-side">
          <section className="form-card">
            <div className="card-head">
              <div className="card-head-text">
                <p className="section-title">Properties</p>
              </div>
              <span className="inc-badge">INC · new</span>
            </div>

            <div className="field">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={ticket.status}
                onChange={(e) =>
                  update({ status: Number(e.target.value) as TicketStatus })
                }
              >
                {STATE_OPTIONS.map((state) => (
                  <option value={state.value} key={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="assigned">Assigned to</label>
              <select
                id="assigned"
                name="assigned"
                value={ticket.assigned}
                onChange={(e) => update({ assigned: e.target.value })}
              >
                <option value="" disabled>
                  Unassigned
                </option>
                {admins.map((admin) => (
                  <option value={admin.username} key={admin.username}>
                    {admin.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Contact type</label>
              <div className="segmented" role="group" aria-label="Contact type">
                {CONTACT_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={
                      ticket.contact_type === opt.value ? "active" : ""
                    }
                    onClick={() => update({ contact_type: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="prop-divider" />

            <div className="field">
              <label>Impact</label>
              <div className="segmented" role="group" aria-label="Impact">
                {LEVEL_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={ticket.impact === opt.value ? "active" : ""}
                    onClick={() =>
                      update({
                        impact: opt.value,
                        priority:
                          getPriority(opt.value, ticket.urgency)?.level ?? "",
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Urgency</label>
              <div className="segmented" role="group" aria-label="Urgency">
                {LEVEL_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={ticket.urgency === opt.value ? "active" : ""}
                    onClick={() =>
                      update({
                        urgency: opt.value,
                        priority:
                          getPriority(ticket.impact, opt.value)?.level ?? "",
                      })
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Priority</label>
              {/* Priority is derived from the impact × urgency relationship */}
              {priority ? (
                <div className={`priority-badge ${priority.level}`}>
                  <span className="priority-dot" />
                  {priority.label}
                </div>
              ) : (
                <div className="priority-badge empty">
                  Set impact &amp; urgency
                </div>
              )}
            </div>

            <div className="prop-divider" />

            <div className="field">
              <label htmlFor="knowledgeI">Knowledge base</label>
              <select
                id="knowledgeI"
                name="kb"
                value={ticket.kb || ""}
                onChange={(e) => update({ kb: Number(e.target.value) })}
              >
                <option value="" disabled>
                  Link an article
                </option>
                {knowledges.map((kb) => (
                  <option value={kb.id} key={kb.id}>
                    {kb.title}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TicketForm;
