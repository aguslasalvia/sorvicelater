import "styles/kblist.css";
import { useEffect, useState } from "react";
import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard/knowledge-card";
import { fetchAllKnowledge } from "@/lib/fetch";
import { Knowledge } from "@/lib/interfaces";

const KnowledgeList = () => {
	const [list, setList] = useState<Knowledge[]>([]);

	useEffect(() => {
		const getAllKnowledge = async () => {
			setList(await fetchAllKnowledge())
		}
		getAllKnowledge()
	}, [])

	return (
		<div className="content page-kblist">
			<header className="kb-header">
				<h1 className="kb-title">Knowledge base</h1>
				<p className="kb-subtitle">Browse documented solutions</p>
			</header>

			{list.length === 0 ? (
				<p className="kb-empty">No articles yet.</p>
			) : (
				<div className="resultsWrapper">
					{list.map((element: Knowledge, index) => (
						<KnowledgeCard title={element.title} id={element.id} key={index} />
					))}
				</div>
			)}
		</div>
	);
};

export default KnowledgeList;
