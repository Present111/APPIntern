import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../PostForm/postform.css";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isEdit) {
      (async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          if (mounted) {
            setTitle(res.data.title || "");
            setContent(res.data.content || "");
          }
        } catch (e) {
          console.error("Load post error:", e);
          setMsg("❌ Không tải được bài viết.");
        }
      })();
    }
    return () => (mounted = false);
  }, [id, isEdit]);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, { title, content });
        setMsg("✅ Cập nhật bài viết thành công!");
      } else {
        await api.post("/posts", { title, content });
        setMsg("✅ Đăng bài thành công!");
      }
      setTimeout(() => navigate("/"), 900);
    } catch (e) {
      console.error("Save error:", e);
      setMsg("❌ Không thể lưu bài viết. Kiểm tra token/quyền truy cập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="bg-blur" />
      <div className="card wide">
        <div className="card-header">
          <div className="logo">📝</div>
          <h1>{isEdit ? "Sửa bài viết" : "Tạo bài viết mới"}</h1>
          <p className="subtitle">
            {isEdit ? "Cập nhật nội dung của bạn" : "Chia sẻ điều bạn nghĩ"}
          </p>
        </div>

        <form onSubmit={save} className="form">
          <label>
            <span>Tiêu đề</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề hấp dẫn…"
              required
              maxLength={200}
            />
          </label>

          <label>
            <span>Nội dung</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết gì đó hay ho…"
              rows={8}
              required
            />
          </label>

          {msg && (
            <div className={`alert ${msg.startsWith("✅") ? "ok" : "err"}`}>
              {msg}
            </div>
          )}

          <div className="actions-row">
            <Link to="/" className="btn btn-ghost">
              Hủy
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Đang lưu…" : isEdit ? "Cập nhật" : "Đăng bài"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
