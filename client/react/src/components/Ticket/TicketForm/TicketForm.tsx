import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Knowledge, User, Ticket } from "@/lib/interfaces";
import { fetchAllKnowledge, fetchAllAdmins } from "@/lib/fetch"

interface TicketFormProps {
	props: Ticket;
}

type Tab = "description" | "details";

const TicketForm = ({ props }: TicketFormProps) => {
	const [admins, setAdmins] = useState<User[]>([])
	const [knowledges, setKnowledge] = useState<Knowledge[]>([])
	const [ticket, setTicket] = useState(props);
	const [tab, setTab] = useState<Tab>("description");

	useEffect(() => {
		const getData = async () => {
			setKnowledge(await fetchAllKnowledge() || [])
			setAdmins(await fetchAllAdmins() || [])
		}
		getData();
	}, [])

	const handleSubmit = () => {

	};

	const state_content = [
		{ value: "new", label: "New" },
		{ value: "resolved", label: "Resolved" },
		{ value: "pendingVendor", label: "Pending (Awaiting vendor)" },
		{ value: "pendingAdmin", label: "Pending (Admin action)" },
		{ value: "pendingTechnical", label: "Pending (Teschnical)" },
		{ value: "pendingOther", label: "Pending (Other)" },
	];

	return (
		<div className="content page-ticket">
			<header className="form-header">
				<div>
					<h1 className="form-title">New incident</h1>
					<p className="form-subtitle">Create and assign a new incident ticket</p>
				</div>
				<div className="form-actions">
					<Link to="/backlog" className="btn-ghost">Cancel</Link>
					<button id="btnTicketSave" className="btn-primary" type="button" onClick={handleSubmit}>
						Save
					</button>
				</div>
			</header>

			<div className="ticket-layout">
				{/* ===== Main column with tabs ===== */}
				<div className="ticket-main">
					<section className="form-card">
						<div className="tabs">
							<button
								type="button"
								className={tab === "description" ? "tab active" : "tab"}
								onClick={() => setTab("description")}
							>
								Description
							</button>
							<button
								type="button"
								className={tab === "details" ? "tab active" : "tab"}
								onClick={() => setTab("details")}
							>
								Details
							</button>
						</div>

						{tab === "description" && (
							<div className="tab-panel">
								<div className="field">
									<label htmlFor="shortDescI">Short description</label>
									<input id="shortDescI" name="Description" type="text" placeholder="Brief summary of the incident" />
								</div>

								<div className="field">
									<label htmlFor="worknotes">Worknotes</label>
									<textarea id="worknotes" name="worknotes" placeholder="What happened, steps taken…" />
								</div>

								<div className="field">
									<label htmlFor="addcomments">Additional comments</label>
									<textarea id="addcomments" name="addcomments" placeholder="Notes visible to the requester" />
								</div>
							</div>
						)}

						{tab === "details" && (
							<div className="tab-panel">
								<div className="field-grid-2">
									<div className="field">
										<label htmlFor="reqBy">Requested by</label>
										<input
											id="reqBy"
											name="reqBy"
											type="text"
											placeholder={props.request_by}
											onChange={(e) => {
												setTicket({ ...ticket, request_by: e.target.value });
											}}
										/>
									</div>

									<div className="field">
										<label htmlFor="reqFor">Requested for</label>
										<input
											id="reqFor"
											name="reqFor"
											type="text"
											placeholder={props?.request_for}
											onChange={(e) => {
												setTicket({ ...ticket, request_for: e.target.value });
											}}
										/>
									</div>

									<div className="field">
										<label htmlFor="srvcOf">Sorvis offering</label>
										<input
											id="srvcOf"
											name="srvcOf"
											type="text"
											placeholder={props?.service_offering}
											onChange={(e) => {
												setTicket({ ...ticket, service_offering: e.target.value });
											}}
										/>
									</div>

									<div className="field">
										<label htmlFor="confItem">Configuration item</label>
										<input
											id="confItem"
											name="confItem"
											type="text"
											placeholder={ticket.item}
											onChange={(e) => {
												setTicket({ ...ticket, item: e.target.value });
											}}
										/>
									</div>

									<div className="field">
										<label htmlFor="category">Category</label>
										<input id="category" name="Category" type="text" placeholder=" " />
									</div>

									<div className="field">
										<label htmlFor="symptom">Symptom</label>
										<input id="symptom" name="Symptom" type="text" placeholder=" " />
									</div>
								</div>
							</div>
						)}
					</section>
				</div>

				{/* ===== Side: properties ===== */}
				<aside className="ticket-side">
					<section className="form-card">
						<p className="section-title">Properties</p>

						<div className="field">
							<label htmlFor="incNum">Incident number</label>
							<input id="incNum" name="incNum" type="text" placeholder="5" readOnly />
						</div>

						<div className="field">
							<label htmlFor="state">State</label>
							<select id="state" name="State">
								<option value="new">New</option>
								{state_content.map((state) => (
									<option value={state.value} key={state.value}>
										{state.label}
									</option>
								))}
							</select>
						</div>

						<div className="field">
							<label htmlFor="assigned">Assigned to</label>
							<select id="assigned" name="Assigned">
								{admins.map((admin) => (
									<option value={admin.id} key={admin.username}>
										{admin.username}
									</option>
								))}
							</select>
						</div>

						<div className="field">
							<label htmlFor="contactType">Contact type</label>
							<select
								id="contactType"
								name="contactType"
								onChange={(e) => {
									setTicket({ ...ticket, contact_type: e.target.value });
								}}
							>
								<option value="Discord">Discord</option>
								<option value="ingame">In-game chat</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div className="field-row">
							<div className="field">
								<label htmlFor="impact">Impact</label>
								<select id="impact" name="Impact">
									<option value="high">1 - High</option>
									<option value="medium">2 - Medium</option>
									<option value="low">3 - Low</option>
								</select>
							</div>

							<div className="field">
								<label htmlFor="urgency">Urgency</label>
								<select id="urgency" name="Urgency">
									<option value="high">1 - High</option>
									<option value="medium">2 - Medium</option>
									<option value="low">3 - Low</option>
								</select>
							</div>
						</div>

						<div className="field">
							<label htmlFor="priority">Priority</label>
							{/* PRIORITY DETERMINADA POR LA RELACION ENTRE EL IMPACTO Y LA URGENCIA */}
							<input id="priority" name="priority" type="text" placeholder="Auto" readOnly />
						</div>

						<div className="field">
							<label htmlFor="knowledgeI">Knowledge base</label>
							<select id="knowledgeI" name="Kb">
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
