import { useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin, onSwitchToRegister  }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      onLogin(data.access_token); // 儲存 token
      navigate("/user");
    } catch (err) {
      alert("登入失敗！");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="帳號" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="密碼" />
      <button type="submit">登入</button>
      <button type="button" onClick={() => navigate("/register")}>
        創建帳號
      </button>
    </form>
  );
}

