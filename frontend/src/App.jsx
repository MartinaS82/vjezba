import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const apiUrl = "http://localhost:8000";

  async function loadItems() {
    const response = await fetch(`${apiUrl}/items`);
    const data = await response.json();
    setItems(data);
  }

  async function addItem() {
    if (!text.trim()) return;

    const response = await fetch(`${apiUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const newItem = await response.json();
    setItems([...items, newItem]);
    setText("");
  }

  async function deleteItem(id) {
    await fetch(`${apiUrl}/items/${id}`, {
      method: "DELETE",
    });

    setItems(items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Frontend + Backend test</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Unesi item"
      />

      <button onClick={addItem}>Dodaj</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteItem(item.id)}>
              Obriši
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;