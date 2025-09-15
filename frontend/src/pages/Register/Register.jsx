import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      setMsg("✅ Đăng ký thành công! Chuyển sang đăng nhập…");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      if (err.response?.status === 409) {
        setMsg("❌ Tên tài khoản đã tồn tại.");
      } else {
        setMsg("❌ Có lỗi xảy ra. Hãy thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="bg-blur" />
      <div className="card">
        <div className="card-header">
          <div className="logo">＋</div>
          <h1>Đăng ký</h1>
          <p className="subtitle">Tạo tài khoản mới 👋</p>
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
                placeholder="Tối thiểu 6 ký tự"
                autoComplete="new-password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label="toggle password"
              >
                {showPw ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </label>

          {msg && (
            <div className={`alert ${msg.startsWith("✅") ? "ok" : "err"}`}>
              {msg}
            </div>
          )}

          <button type="submit" className="submit" disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="card-footer">
          <span>Đã có tài khoản?</span>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
