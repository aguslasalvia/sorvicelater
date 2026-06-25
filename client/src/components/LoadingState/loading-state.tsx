import "./loading-state.css";
import { LoaderCircle } from "lucide-react";

interface LoadingStateProps {
	label?: string;
}

const LoadingState = ({ label = "Loading…" }: LoadingStateProps) => (
	<div className="loading-state" role="status" aria-live="polite">
		<LoaderCircle size={28} className="loading-state__spinner" />
		<p className="loading-state__label">{label}</p>
	</div>
);

export default LoadingState;
