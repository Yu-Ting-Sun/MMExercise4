// import React, { useState } from "react";

// function App() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     const formData = new URLSearchParams();
//     formData.append("username", username);
//     formData.append("password", password);

//     try {
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("登入失敗！");
//       }

//       const data = await response.json();
//       setToken(data.access_token);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>登入</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>帳號：</label>
//           <input value={username} onChange={(e) => setUsername(e.target.value)} required />
//         </div>
//         <div>
//           <label>密碼：</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">登入</button>
//       </form>

//       {token && (
//         <div style={{ marginTop: 20 }}>
//           <strong>✅ 登入成功，Token：</strong>
//           <pre>{token}</pre>
//         </div>
//       )}

//       {error && (
//         <div style={{ marginTop: 20, color: "red" }}>
//           <strong>錯誤：</strong> {error}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import LoginPage from "./LoginPage";
// import UserInfo from "./UserInfo";
// import CreateUser from "./CreateUser";

// function App() {
//   const [token, setToken] = useState(null);
//   const [isRegister, setIsRegister] = useState(false);

//   return (
//     <div>
//       {token ? (
//         <UserInfo token={token} />
//       ) : isRegister ? (
//         <CreateUser
//           onRegister={(token) => {
//             setToken(token);
//             setIsRegister(false);
//           }}
//           onBackToLogin={() => setIsRegister(false)}
//         />
//       ) : (
//         <LoginPage
//           onLogin={(token) => setToken(token)}
//           onSwitchToRegister={() => setIsRegister(true)}
//         />
//       )}
//     </div>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./LoginPage";
import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import UpdateUser from "./UpdateUser";

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/user" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage onLogin={setToken} />} />
        <Route path="/register" element={<CreateUser onRegister={setToken} />} />
        <Route path="/user" element={<UserInfo token={token} />} />
        <Route path="/update" element={<UpdateUser token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

