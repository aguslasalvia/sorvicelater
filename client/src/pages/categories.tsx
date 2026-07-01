import "styles/categories.css";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X, Tag, Tags } from "lucide-react";
import LoadingState from "@/components/LoadingState/loading-state";
import {
  fetchCategories,
  fetchCreateCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
} from "@/lib/fetch";
import { Category } from "@/lib/interfaces";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      setCategories(await fetchCategories());
      setLoading(false);
    };
    getCategories();
  }, []);

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    const created = await fetchCreateCategory(name);
    if (!created) return;
    setCategories((prev) => [...prev, created]);
    setNewName("");
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEditing = async (id: number) => {
    const name = editName.trim();
    if (!name) return;
    const updated = await fetchUpdateCategory(id, name);
    if (!updated) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );
    cancelEditing();
  };

  const handleDelete = async (id: number) => {
    const ok = await fetchDeleteCategory(id);
    if (!ok) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="content page-categories">
      <div className="cat-shell">
        <header className="cat-header">
          <div className="cat-header-text">
            <h1 className="cat-title">Categories</h1>
            <p className="cat-subtitle">Manage the incident categories</p>
          </div>
          {!loading && (
            <span className="cat-count">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </span>
          )}
        </header>

        <div className="cat-add">
          <span className="cat-add-icon">
            <Tag size={16} />
          </span>
          <input
            className="cat-add-input"
            type="text"
            value={newName}
            placeholder="New category name"
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button type="button" className="cat-add-btn" onClick={handleCreate}>
            <Plus size={16} /> Add
          </button>
        </div>

        {loading ? (
          <LoadingState label="Loading categories…" />
        ) : categories.length === 0 ? (
          <div className="cat-empty">
            <div className="cat-empty-icon">
              <Tags size={30} />
            </div>
            <p className="cat-empty-title">No categories yet</p>
            <p className="cat-empty-text">Add your first category above.</p>
          </div>
        ) : (
          <div className="cat-grid">
            {categories.map((category) => (
              <div
                className={`cat-card${
                  editingId === category.id ? " editing" : ""
                }`}
                key={category.id}
              >
                {editingId === category.id ? (
                  <>
                    <input
                      className="cat-card-input"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && saveEditing(category.id)
                      }
                      autoFocus
                    />
                    <div className="cat-card-actions">
                      <button
                        type="button"
                        className="cat-icon-btn save"
                        onClick={() => saveEditing(category.id)}
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        className="cat-icon-btn"
                        onClick={cancelEditing}
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="cat-card-tag">
                      <Tag size={15} />
                    </span>
                    <span className="cat-card-name">{category.name}</span>
                    <div className="cat-card-actions">
                      <button
                        type="button"
                        className="cat-icon-btn"
                        onClick={() => startEditing(category)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="cat-icon-btn danger"
                        onClick={() => handleDelete(category.id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
