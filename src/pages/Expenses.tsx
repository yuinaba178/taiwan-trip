import { useState, useEffect } from 'react';

type E = { id: string; who: string; cur: 'JPY' | 'TWD'; amt: number; note?: string };

export default function Expenses() {
  const [list, setList] = useState<E[]>(() => JSON.parse(localStorage.getItem('exp') || '[]'));
  const [form, setForm] = useState<E>({ id: '', who: 'me', cur: 'TWD', amt: 0 });
  useEffect(() => { localStorage.setItem('exp', JSON.stringify(list)); }, [list]);

  const add = () => {
    if (!form.amt) return;
    setList(p => [{ ...form, id: crypto.randomUUID() }, ...p]);
    setForm({ id: '', who: 'me', cur: 'TWD', amt: 0 });
  };

  const total = list.reduce((a: any, b) => { a[b.cur] += b.amt; return a; }, { JPY: 0, TWD: 0 });

  return (
    <div>
      <h1>Expenses</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={form.who} onChange={e => setForm({ ...form, who: e.target.value })}>
          <option value="me">自分</option><option value="partner">同行者</option>
        </select>
        <select value={form.cur} onChange={e => setForm({ ...form, cur: e.target.value as any })}>
          <option>TWD</option><option>JPY</option>
        </select>
        <input type="number" value={form.amt || ''} placeholder="金額"
               onChange={e => setForm({ ...form, amt: Number(e.target.value) })}/>
        <input value={form.note || ''} placeholder="メモ"
               onChange={e => setForm({ ...form, note: e.target.value })}/>
        <button onClick={add}>追加</button>
      </div>
      <p style={{ marginTop: 8 }}>合計：{total.TWD} TWD / {total.JPY} JPY</p>
      <ul>{list.map(x => <li key={x.id}>{x.cur} {x.amt} - {x.who} {x.note || ''}</li>)}</ul>
    </div>
  );
}
