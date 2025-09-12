import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../store/auth";
import { useNavigate, Link } from "react-router-dom";
import "../Login/login.css"; // dùng chung style

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuth((s) => s.setUser);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setUser({ username: res.data.username });
      navigate("/");
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="bg-blur" />
      <div className="card">
        <div className="card-header">
          <div className="logo">✦</div>
          <h1>Đăng nhập</h1>
          <p className="subtitle">Chào mừng quay lại 👋</p>
        </div>

        <form onSubmit={submit} className="form">
          <label>
            <span>Tên đăng nhập</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ví dụ: viet1"
              autoComplete="username"
              required
            />
          </label>

          <label className="pw-field">
            <span>Mật khẩu</span>
            <div className="pw-box">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="pw-toggle"
                aria-label="toggle password"
                onClick={() => setShowPw((s) => !s)}
              >
                {showPw ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </label>

          {error && <div className="alert">{error}</div>}

          <button type="submit" className="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="card-footer">
          <span>Chưa có tài khoản?</span>
          <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
