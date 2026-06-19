import "styles/kbarticle.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Sparkles } from "lucide-react";
import { KnowledgeBaseForm } from "@/lib/forms";
import { fetchKnowledge } from '@/lib/fetch'

const KnowledgeForm = () => {
	const [knowledgeForm, setKnowledgeForm] = useState(KnowledgeBaseForm);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const response = await fetchKnowledge(knowledgeForm);
		if (response !== 404 && response !== 500) {
			navigate('/backlog')
		}
	};

	return (
		<div className="content page-kbarticle">
			<header className="form-header">
				<div className="form-heading">
					<span className="form-eyebrow"><Sparkles size={13} /> Knowledge</span>
					<h1 className="form-title">New article</h1>
					<p className="form-subtitle">Document a solution for the knowledge base.</p>
				</div>
				<div className="form-actions">
					<Link to="/backlog" className="btn-ghost">Cancel</Link>
					<button id="btnKbSave" className="btn-primary" type="button" onClick={handleSubmit}>
						Save article
					</button>
				</div>
			</header>

			<div className="kb-layout">
				<section className="form-card">
					<div className="card-head">
						<div className="card-head-text">
							<p className="section-title">Article</p>
							<p className="section-hint">Give it a clear title and a complete description.</p>
						</div>
					</div>

					<div className="field">
						<label htmlFor="kbTitleI">Title</label>
						<input
							id="kbTitleI"
							className="input-lg"
							name="title"
							type="text"
							value={knowledgeForm.title}
							placeholder="e.g. How to reset a vendor connection"
							onChange={(e) => setKnowledgeForm({ ...knowledgeForm, title: e.target.value })}
						/>
					</div>

					<div className="field">
						<label htmlFor="kbKnowledgeI">Description</label>
						<textarea
							id="kbKnowledgeI"
							name="knowledge"
							value={knowledgeForm.description}
							placeholder="Steps, context, resolution…"
							onChange={(e) => setKnowledgeForm({ ...knowledgeForm, description: e.target.value })}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default KnowledgeForm;
