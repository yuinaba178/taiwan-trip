import { useState, useEffect } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean; section: string }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [section, setSection] = useState("出国前");

  // localStorage から読み込み
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // localStorage に保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false, section }]);
    setNewTask("");
  };

  const sections = ["出国前", "到着後"];

  return (
    <div>
      <h1>Tasks</h1>

      {/* タスク追加フォーム */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>
        <button onClick={addTask}>追加</button>
      </div>

      {/* セクション別タスク表示 */}
      {sections.map(sec => (
        <div key={sec} style={{ marginBottom: "1rem" }}>
          <h2>{sec}</h2>
          {tasks.filter(t => t.section === sec).map(t => (
            <div key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                />
                {t.text}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
