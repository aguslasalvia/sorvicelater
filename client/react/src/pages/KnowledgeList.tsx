import "./kblist.css";
import { useEffect, useState } from "react";
import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard/KnowledgeCard";
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
			<p className="title">Knowledge List</p>
			<div className="resultsWrapper">
				{list.map((element: Knowledge, index) => (
					<KnowledgeCard title={element.title} id={element.id} key={index} />
				))}
			</div>
		</div>
	);
};

export default KnowledgeList;
