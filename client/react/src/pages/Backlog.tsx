import "./backlog.css";
import Counters from "@/components/Counters/Counters";

export default function Backlog() {
	return (
		<div className="content page-backlog">
			<header className="backlog-header">
				<h1 className="backlog-title">Backlog</h1>
				<p className="backlog-subtitle">Overview of incident states</p>
			</header>
			<Counters />
		</div>
	);
}
