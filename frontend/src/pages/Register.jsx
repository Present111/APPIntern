import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); // reset message trước khi gửi

    try {
      await api.post("/auth/register", { username, password });
      setMsg("✅ Đăng ký thành công, hãy đăng nhập");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      if (err.response && err.response.status === 409) {
        setMsg("❌ Đăng ký thất bại. Tên tài khoản đã tồn tại.");
      } else {
        setMsg("❌ Có lỗi xảy ra. Hãy thử lại.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto" }}>
      <h2>Đăng ký</h2>
      <form onSubmit={submit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={6}
        />
        <button type="submit">Tạo tài khoản</button>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
