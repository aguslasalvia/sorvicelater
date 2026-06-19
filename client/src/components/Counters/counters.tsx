import { useEffect, useState } from "react";
import { Inbox, Clock, CircleCheck, Layers, type LucideIcon } from "lucide-react";
import { fetchTicketStateCounters } from "@/lib/fetch";

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

const RADIUS = 70;
const CIRC = 2 * Math.PI * RADIUS;

const Counters = () => {
	const [counters, setCounters] = useState<Counters>({ new: 0, pending: 0, resolved: 0 })

	useEffect(() => {
		const getCounters = async () => {
			setCounters(await fetchTicketStateCounters())
		}
		getCounters()
	}, [])

	const total = counters.new + counters.pending + counters.resolved;
	const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100));

	let cumulative = 0;
	const segments = stats.map((s) => {
		const value = counters[s.key];
		const frac = total === 0 ? 0 : value / total;
		const seg = { ...s, value, frac, start: cumulative };
		cumulative += frac;
		return seg;
	});

	return (
		<>
			{/* ===== KPI row ===== */}
			<div className="dash-kpis">
				<div className="kpi tone-total">
					<div className="kpi__head">
						<span className="kpi__label">Total</span>
						<Layers size={18} className="kpi__icon" />
					</div>
					<p className="kpi__value">{total}</p>
				</div>
				{stats.map(({ key, label, icon: Icon, tone }) => (
					<div className={`kpi tone-${tone}`} key={key}>
						<div className="kpi__head">
							<span className="kpi__label">{label}</span>
							<Icon size={18} className="kpi__icon" />
						</div>
						<p className="kpi__value">{counters[key]}</p>
					</div>
				))}
			</div>

			{/* ===== Panels ===== */}
			<div className="dash-panels">
				<div className="panel">
					<p className="panel__title">Incidents by status</p>
					<div className="donut-wrap">
						<svg viewBox="0 0 180 180" className="donut">
							<circle className="donut__track" cx="90" cy="90" r={RADIUS} />
							{segments.map((s) => (
								<circle
									key={s.key}
									className={`donut__seg tone-${s.tone}`}
									cx="90"
									cy="90"
									r={RADIUS}
									strokeDasharray={`${s.frac * CIRC} ${CIRC}`}
									transform={`rotate(${s.start * 360 - 90} 90 90)`}
								/>
							))}
						</svg>
						<div className="donut__center">
							<span className="donut__total">{total}</span>
							<span className="donut__caption">incidents</span>
						</div>
					</div>
				</div>

				<div className="panel">
					<p className="panel__title">Status breakdown</p>
					<div className="breakdown">
						{stats.map(({ key, label, tone }) => (
							<div className="breakdown__row" key={key}>
								<div className="breakdown__head">
									<span className="breakdown__name">
										<span className={`dot tone-${tone}`} />
										{label}
									</span>
									<span className="breakdown__meta">
										{counters[key]} · {pct(counters[key])}%
									</span>
								</div>
								<div className={`breakdown__bar tone-${tone}`}>
									<span style={{ width: `${pct(counters[key])}%` }} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Counters;
