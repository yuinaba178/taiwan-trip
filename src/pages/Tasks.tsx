import { useEffect, useState } from 'react';

type T = { id: string; label: string; done: boolean; section: 'pre' | 'arrival' | 'daily' };

const initial: T[] = [
  { id: 'passport',   label: 'パスポート有効期限確認',                 done: false, section: 'pre' },
  { id: 'twac',       label: 'TWAC 提出（到着3日前以内）',             done: false, section: 'pre' },
  { id: 'lucky',      label: 'Lucky Land 事前登録（QR保存）',          done: false, section: 'pre' },
  { id: 'ins',        label: '空港アクセスを対象カードで決済（保険）', done: false, section: 'pre' },
  { id: 'lucky_arr',  label: '到着後 Lucky Land 抽選',                 done: false, section: 'arrival' },
];

export default function Tasks() {
  const [list, setList] = useState<T[]>(() => {
    const c = localStorage.getItem('tasks');
    return c ? JSON.parse(c) : initial;
  });
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(list)); }, [list]);

  const toggle = (id: string) => setList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const section = (key: 'pre' | 'arrival' | 'daily', title: string) => (
    <div style={{ margin: '12px 0' }}>
      <b>{title}</b>
      {list.filter(t => t.section === key).map(t => (
        <label key={t.id} style={{ display: 'block', cursor: 'pointer' }}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.label}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Tasks</h1>
      {section('pre', '出国前')}
      {section('arrival', '到着後')}
    </div>
  );
}
