import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./Posts.css";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data || []);
    } catch (e) {
      console.error("Load posts error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const fmt = (d) =>
    d ? new Date(d).toLocaleString("vi-VN", { hour12: false }) : "";

  return (
    <div className="page-wrap">
      <div className="bg-blur" />
      <header className="topbar">
        <h1>Danh sách bài viết</h1>
        <Link to="/posts/new" className="btn btn-primary">
          + Tạo bài viết
        </Link>
      </header>

      <main className="post-grid">
        {loading ? (
          <div className="skeleton">Đang tải bài viết…</div>
        ) : posts.length === 0 ? (
          <div className="empty">
            <div className="empty-badge">📝</div>
            <h3>Chưa có bài viết nào</h3>
            <p>Bắt đầu chia sẻ điều bạn nghĩ.</p>
            <Link to="/posts/new" className="btn btn-primary">
              Tạo bài viết
            </Link>
          </div>
        ) : (
          posts.map((p) => (
            <article className="post-card" key={p.id}>
              <div className="post-head">
                <h3 className="post-title">{p.title}</h3>
                <div className="meta">
                  <span>👤 {p.authorUsername || "—"}</span>
                  <span>⏰ {fmt(p.createdAt)}</span>
                </div>
              </div>

              <p className="post-content">{p.content}</p>

              <div className="actions">
                <Link to={`/posts/${p.id}/edit`} className="btn btn-ghost">
                  ✏️ Sửa
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-danger"
                >
                  🗑️ Xóa
                </button>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
