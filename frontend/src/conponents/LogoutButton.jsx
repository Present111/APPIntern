// src/components/LogoutButton.jsx
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const setUser = useAuth((s) => s.setUser);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // xoá token
    setUser(null); // xoá user trong store
    navigate("/login"); // chuyển về login
  };

  return <button onClick={logout}>Logout</button>;
}
