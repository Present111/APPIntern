import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostsList from "./pages/PostsList";
import PostForm from "./pages/PostForm";
import PrivateRoute from "./conponents/PrivateRoute";
import LogoutButton from "./conponents/LogoutButton";

export default function App() {
  const location = useLocation();

  // Ẩn logout ở trang login/register
  const hideLogout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideLogout && (
        <div style={{ padding: "10px", textAlign: "right" }}>
          <LogoutButton />
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Các route cần login */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
        </Route>
      </Routes>
    </>
  );
}
