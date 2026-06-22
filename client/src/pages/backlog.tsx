import "styles/backlog.css";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import Counters from "@/components/Counters/counters";

export default function Backlog() {
	return (
		<div className="content page-backlog">
			<header className="backlog-header">
				<div>
					<h1 className="backlog-title">Backlog</h1>
					<p className="backlog-subtitle">Overview of incident states</p>
				</div>
				<Link to="/new/ticket" className="backlog-new-btn">
					<Plus size={16} /> New incident
				</Link>
			</header>
			<Counters />
		</div>
	);
}
