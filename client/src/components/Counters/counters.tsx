import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Inbox, Clock, CircleCheck, type LucideIcon } from "lucide-react";
import {
	fetchTicketStateCounters,
	fetchAllTickets,
	fetchTicketEfficiency,
	type Efficiency,
} from "@/lib/fetch";
import { Ticket } from "@/lib/interfaces";
import { TicketStatus, statusLabel } from "@/lib/constants";

const effBuckets: { key: keyof Efficiency; label: string; tone: string }[] = [
	{ key: "under24h", label: "Under 24h", tone: "resolved" },
	{ key: "under72h", label: "1–3 days", tone: "pending" },
	{ key: "over72h", label: "Over 3 days", tone: "slow" },
];

type Counters = { new: number; pending: number; resolved: number };

type StatConfig = {
	key: keyof Counters;
	label: string;
	icon: LucideIcon;
	tone: string;
};

const stats: StatConfig[] = [
	{ key: "new", label: "New", icon: Inbox, tone: "new" },
	{ key: "pending", label: "Pending", icon: Clock, tone: "pending" },
	{ key: "resolved", label: "Resolved", icon: CircleCheck, tone: "resolved" },
];

const STATUS_TONE: Record<TicketStatus, string> = {
	[TicketStatus.New]: "new",
	[TicketStatus.Pending]: "pending",
	[TicketStatus.Resolved]: "resolved",
};

const Counters = () => {
	const [counters, setCounters] = useState<Counters>({ new: 0, pending: 0, resolved: 0 });
	const [recent, setRecent] = useState<Ticket[]>([]);
	const [efficiency, setEfficiency] = useState<Efficiency>({
		under24h: 0,
		under72h: 0,
		over72h: 0,
	});

	useEffect(() => {
		const load = async () => {
			setCounters(await fetchTicketStateCounters());
			setEfficiency(await fetchTicketEfficiency());
			const all = await fetchAllTickets();
			setRecent(
				[...all].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 5),
			);
		};
		load();
	}, []);

	const total = counters.new + counters.pending + counters.resolved;
	const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100));

	const effTotal =
		efficiency.under24h + efficiency.under72h + efficiency.over72h;
	const effPct = (n: number) =>
		effTotal === 0 ? 0 : Math.round((n / effTotal) * 100);

	return (
		<>
			{/* ===== Hero summary ===== */}
			<section className="bl-hero">
				<div className="bl-hero__main">
					<span className="bl-hero__label">Total incidents</span>
					<p className="bl-hero__value">{total}</p>
				</div>

				<div className="bl-hero__chart">
					<div className="stack-bar">
						{total === 0 ? (
							<span
								className="stack-seg stack-seg--empty"
								style={{ width: "100%" }}
							/>
						) : (
							stats.map((s) => (
								<span
									key={s.key}
									className={`stack-seg tone-${s.tone}`}
									style={{ width: `${pct(counters[s.key])}%` }}
								/>
							))
						)}
					</div>

					<div className="stack-legend">
						{stats.map(({ key, label, tone }) => (
							<span className="stack-legend__item" key={key}>
								<span className={`dot tone-${tone}`} />
								{label}
								<strong>{counters[key]}</strong>
								<span className="stack-legend__pct">{pct(counters[key])}%</span>
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ===== Status cards ===== */}
			<div className="bl-cards">
				{stats.map(({ key, label, icon: Icon, tone }) => (
					<div className={`bl-card tone-${tone}`} key={key}>
						<div className="bl-card__head">
							<span className="bl-card__label">{label}</span>
							<Icon size={18} className="bl-card__icon" />
						</div>
						<p className="bl-card__value">{counters[key]}</p>
						<div className="bl-card__bar">
							<span style={{ width: `${pct(counters[key])}%` }} />
						</div>
					</div>
				))}
			</div>

			{/* ===== Resolution efficiency ===== */}
			<section className="bl-eff">
				<div className="bl-recent__head">
					<p className="bl-recent__title">Resolution efficiency</p>
					<span className="bl-eff__count">{effTotal} resolved</span>
				</div>

				{effTotal === 0 ? (
					<p className="bl-recent__empty">No resolved incidents yet.</p>
				) : (
					<div className="bl-eff__rows">
						{effBuckets.map(({ key, label, tone }) => (
							<div className="bl-eff__row" key={key}>
								<div className="bl-eff__head">
									<span className="bl-eff__name">
										<span className={`dot tone-${tone}`} />
										{label}
									</span>
									<span className="bl-eff__meta">
										{efficiency[key]} · {effPct(efficiency[key])}%
									</span>
								</div>
								<div className={`bl-eff__bar tone-${tone}`}>
									<span style={{ width: `${effPct(efficiency[key])}%` }} />
								</div>
							</div>
						))}
					</div>
				)}
			</section>

			{/* ===== Recent incidents ===== */}
			<section className="bl-recent">
				<div className="bl-recent__head">
					<p className="bl-recent__title">Recent incidents</p>
					<Link to="/lists/allTickets" className="bl-recent__link">
						View all
					</Link>
				</div>

				{recent.length === 0 ? (
					<p className="bl-recent__empty">No incidents yet.</p>
				) : (
					<ul className="bl-recent__list">
						{recent.map((t) => (
							<li className="bl-row" key={t.id}>
								<span className="bl-row__id">#{t.id}</span>
								<span className="bl-row__title">
									{t.description || t.service_offering || "Untitled incident"}
								</span>
								<span className="bl-row__assignee">
									{t.assigned || "Unassigned"}
								</span>
								<span className={`status-pill tone-${STATUS_TONE[t.status as TicketStatus]}`}>
									{statusLabel(t.status as TicketStatus)}
								</span>
							</li>
						))}
					</ul>
				)}
			</section>
		</>
	);
};

export default Counters;
