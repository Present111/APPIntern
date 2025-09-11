import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      })();
    }
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/posts/${id}`, { title, content });
    else await api.post(`/posts`, { title, content });
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h2>{id ? "Sửa bài" : "Tạo bài"}</h2>
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
          rows={8}
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}
