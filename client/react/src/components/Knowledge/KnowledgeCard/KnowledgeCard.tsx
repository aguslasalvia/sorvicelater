interface KnowledgeCardProp {
	id: number
	title: string,
}

export const KnowledgeCard = (item: KnowledgeCardProp) => {
	return (
		<div className="result">
			<p className="kbID">{item.id}</p>
			<p className="kbTitle">{item.title}</p>
			<a className="button">Open</a>
		</div>
	);
};
