import { useEffect, useState } from 'react';

export default function StudentsPage() {
  const [students, setStudents] = useState<{ name: string; email: string }[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName('');
    setEmail('');
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Students</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ flex: 1, minWidth: 200, maxWidth: 400, fontSize: 16, padding: 8 }}
          maxLength={30}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ flex: 1, minWidth: 200, maxWidth: 400, fontSize: 16, padding: 8 }}
          maxLength={30}
        />
        <button
          onClick={addStudent}
          style={{ fontSize: 16, padding: "4px 8px" }}
        >
          Add
        </button>
      </div>
      <ul>
        {students.map((s, i) => (
          <li key={i}>{s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

