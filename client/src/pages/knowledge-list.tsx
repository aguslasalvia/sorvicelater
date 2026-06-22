import "styles/kblist.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Pencil } from "lucide-react";
import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard/knowledge-card";
import SearchBar from "@/components/SearchBar/search-bar";
import Modal from "@/components/Modal/modal";
import { fetchAllKnowledge, fetchUpdateKnowledge } from "@/lib/fetch";
import { Knowledge } from "@/lib/interfaces";

const KnowledgeList = () => {
	const [list, setList] = useState<Knowledge[]>([]);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Knowledge | null>(null);
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState({ title: "", description: "" });

	useEffect(() => {
		const getAllKnowledge = async () => {
			setList(await fetchAllKnowledge());
		};
		getAllKnowledge();
	}, []);

	const filtered = list.filter((k) =>
		k.title.toLowerCase().includes(query.trim().toLowerCase()),
	);

	const openArticle = (article: Knowledge) => {
		setSelected(article);
		setEditing(false);
	};

	const closeModal = () => {
		setSelected(null);
		setEditing(false);
	};

	const startEditing = () => {
		if (!selected) return;
		setDraft({ title: selected.title, description: selected.description });
		setEditing(true);
	};

	const saveEditing = async () => {
		if (!selected) return;
		const updated = await fetchUpdateKnowledge(selected.id, draft);
		if (!updated) return;
		setList((prev) =>
			prev.map((k) => (k.id === selected.id ? { ...k, ...draft } : k)),
		);
		setSelected({ ...selected, ...draft });
		setEditing(false);
	};

	return (
		<div className="content page-kblist">
			<header className="kb-header">
				<div>
					<h1 className="kb-title">Knowledge base</h1>
					<p className="kb-subtitle">Browse documented solutions</p>
				</div>
				<Link to="/new/knowledge" className="kb-new-btn">
					<Plus size={16} /> New KB
				</Link>
			</header>

			<SearchBar
				value={query}
				onChange={setQuery}
				placeholder="Search articles by title…"
			/>

			{filtered.length === 0 ? (
				<p className="kb-empty">
					{query !== "" ? "No articles match your search." : "No articles yet."}
				</p>
			) : (
				<div className="resultsWrapper">
					{filtered.map((element: Knowledge, index) => (
						<KnowledgeCard item={element} onView={openArticle} key={index} />
					))}
				</div>
			)}

			<Modal
				open={selected !== null}
				onClose={closeModal}
				title={
					<>
						<span className="kb-modal-id">KB · #{selected?.id}</span>
						{editing ? (
							<input
								className="kb-modal-input"
								value={draft.title}
								placeholder="Article title"
								onChange={(e) =>
									setDraft({ ...draft, title: e.target.value })
								}
							/>
						) : (
							<h2 className="kb-modal-title">{selected?.title}</h2>
						)}
					</>
				}
			>
				{editing ? (
					<textarea
						className="kb-modal-textarea"
						value={draft.description}
						placeholder="Article content"
						onChange={(e) =>
							setDraft({ ...draft, description: e.target.value })
						}
					/>
				) : (
					<p className="kb-modal-desc">{selected?.description}</p>
				)}

				<div className="kb-modal-actions">
					{editing ? (
						<>
							<button
								type="button"
								className="kb-modal-btn ghost"
								onClick={() => setEditing(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="kb-modal-btn primary"
								onClick={saveEditing}
							>
								Save
							</button>
						</>
					) : (
						<button
							type="button"
							className="kb-modal-btn ghost"
							onClick={startEditing}
						>
							<Pencil size={15} /> Edit
						</button>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default KnowledgeList;
