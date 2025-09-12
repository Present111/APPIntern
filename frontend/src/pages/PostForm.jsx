import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (id) {
        await api.put(`/posts/${id}`, { title, content });
        setMsg("✅ Cập nhật bài viết thành công!");
      } else {
        await api.post("/posts", { title, content });
        setMsg("✅ Đăng bài thành công!");
      }
      setTimeout(() => navigate("/"), 1000);
    } catch (e) {
      console.error("Save error:", e);
      setMsg(
        "❌ Không thể lưu bài viết. Kiểm tra lại token hoặc quyền truy cập!"
      );
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "30px auto" }}>
      <h2>{id ? "Sửa bài viết" : "Tạo bài viết mới"}</h2>
      <form onSubmit={save}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung"
        />
        <button type="submit">{id ? "Cập nhật" : "Đăng bài"}</button>
      </form>
      {msg && (
        <p style={{ color: msg.startsWith("✅") ? "green" : "red" }}>{msg}</p>
      )}
    </div>
  );
}
