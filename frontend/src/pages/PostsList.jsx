import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts"); // GET /api/posts
      setPosts(res.data);
    } catch (e) {
      console.error("Load posts error:", e);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xóa bài viết này?")) {
      try {
        await api.delete(`/posts/${id}`); // DELETE /api/posts/{id}
        loadPosts();
      } catch (e) {
        console.error("Delete error:", e);
      }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>Danh sách bài viết</h2>
      <Link to="/posts/new">
        <button>+ Tạo bài viết</button>
      </Link>
      <ul>
        {posts.length > 0 ? (
          posts.map((p) => (
            <li key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <Link to={`/posts/${p.id}/edit`}>✏️ Sửa</Link>
              <button onClick={() => handleDelete(p.id)}>🗑️ Xoá</button>
            </li>
          ))
        ) : (
          <p>Chưa có bài viết nào.</p>
        )}
      </ul>
    </div>
  );
}
