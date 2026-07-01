import { BookOpen, ArrowUpRight } from "lucide-react";
import { Knowledge } from "@/lib/interfaces";

interface KnowledgeCardProp {
	item: Knowledge;
	onView: (item: Knowledge) => void;
}

export const KnowledgeCard = ({ item, onView }: KnowledgeCardProp) => {
	return (
		<div className="result">
			<div className="kbTop">
				<span className="kbIcon">
					<BookOpen size={16} />
				</span>
				<span className="kbID">KB · #{item.id}</span>
			</div>
			<p className="kbTitle">{item.title}</p>
			<p className="kbDesc">{item.description}</p>
			<button type="button" className="button" onClick={() => onView(item)}>
				Open <ArrowUpRight size={16} />
			</button>
		</div>
	);
};
