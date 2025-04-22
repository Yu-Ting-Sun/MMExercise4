import { updateUser } from "./api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateUser({ token }) {
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUser(token, password, birthday);
      alert("更新成功！");
      navigate("/login");
    } catch (err) {
      alert("更新失敗！");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="密碼" />
      <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" placeholder="生日" />
      <button type="submit">更新</button>
    </form>
  );
}

