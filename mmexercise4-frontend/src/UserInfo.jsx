import { useEffect, useState } from "react";
import { getUser, deleteUser } from "./api";
import { useNavigate } from "react-router-dom";

export default function UserInfo({ token }) {
  const [user, setUser] = useState(null);
  const username = getUsernameFromToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(token, username) // 這裡改成你要查的帳號
      .then(setUser)
      .catch((err) => alert("取得使用者資料失敗"));
  }, [token]);

  if (!user) return <p>載入中...</p>;

  return (
    <div>
      <h3>使用者資料</h3>
      <p>帳號：{user.username}</p>
      <p>生日：{user.birthday}</p>
      <button type="button" onClick={() => navigate("/update")}>
        變更資料
      </button>
      <button
        type="button"
        onClick={async () => {
            try {
            await deleteUser(token, user.username);
            alert("帳號已刪除！");
            navigate("/login");
            } catch (err) {
            alert("刪除失敗！");
            }
        }}
      >
        刪除帳號
      </button>
    </div>
  );
  
}

function getUsernameFromToken(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded).sub;
  }