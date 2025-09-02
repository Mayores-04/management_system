"use client";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();

      // ✅ Ensure it's always an array
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users from MySQL</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
