import { ArrowUpRight } from "lucide-react";
import { Knowledge } from "@/lib/interfaces";

interface KnowledgeCardProp {
	item: Knowledge;
	onView: (item: Knowledge) => void;
}

export const KnowledgeCard = ({ item, onView }: KnowledgeCardProp) => {
	return (
		<div className="result">
			<span className="kbID">KB · #{item.id}</span>
			<p className="kbTitle">{item.title}</p>
			<button type="button" className="button" onClick={() => onView(item)}>
				Open <ArrowUpRight size={16} />
			</button>
		</div>
	);
};
