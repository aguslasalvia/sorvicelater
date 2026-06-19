import { ArrowUpRight } from "lucide-react";

interface KnowledgeCardProp {
	id: number
	title: string,
}

export const KnowledgeCard = (item: KnowledgeCardProp) => {
	return (
		<div className="result">
			<span className="kbID">KB · #{item.id}</span>
			<p className="kbTitle">{item.title}</p>
			<a className="button">
				Open <ArrowUpRight size={16} />
			</a>
		</div>
	);
};
