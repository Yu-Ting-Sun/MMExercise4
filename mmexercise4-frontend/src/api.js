const API_BASE = "http://localhost:8000";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getUser(token, username) {
  const res = await fetch(`${API_BASE}/user/?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Get user failed");
  return res.json();
}

export async function createUser(username, password, birthday){
    const res = await fetch(`${API_BASE}/user/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
          },
        body: JSON.stringify({
            username: username,
            password: password,
            birthday: birthday
        })
      });
    
      if (!res.ok) throw new Error("Create user failed");
      return res.json();   
}

export async function updateUser(token, password, birthday){
    const res = await fetch(`${API_BASE}/user/`, {
        method: "PATCH",
        headers: {
            
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify({
            password: password,
            birthday: birthday
        })
      });
    
      if (!res.ok) throw new Error("Update user failed");
      return res.json();   
}

export async function deleteUser(token, username){
    const res = await fetch(`${API_BASE}/user/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded", 
          },
        body: new URLSearchParams({ username })
      });
    
      if (!res.ok) throw new Error("Delete user failed");
      return res.json();   
}