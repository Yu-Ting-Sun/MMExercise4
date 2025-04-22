import { createUser } from "./api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUser(username, password, birthday);
      alert("註冊成功！");
      navigate("/login");
    } catch (err) {
      alert("創建失敗！");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="帳號" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="密碼" />
      <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" placeholder="生日" />
      <button type="submit">創建</button>
    </form>
  );
}

