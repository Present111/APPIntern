import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function PostsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/posts");
      setData(res.data.content ?? []);
    })();
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto" }}>
      <h2>Bài viết của tôi</h2>
      <Link to="/new">+ Tạo bài</Link>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <b>{p.title}</b> — {new Date(p.createdAt).toLocaleString()} —
            <Link to={`/edit/${p.id}`}> Sửa</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
