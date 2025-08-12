export default function Itinerary() {
  const plan = [
    { day: '9/20 Sat', items: ['自宅→成田', 'IASSラウンジ', '12:20 NRT→TPE', '15:00 桃園→ホテル'] },
    { day: '9/21 Sun', items: ['十分（灯籠）', '九份（夕景〜夜景）'] },
    { day: '9/22 Mon', items: ['故宮博物院', '永康街/龍山寺/101', '夜市'] },
    { day: '9/23 Tue', items: ['台北→桃園MRT', '14:40 TPE→NRT', '19:00 成田'] },
  ];

  return (
    <div>
      <h1>Itinerary</h1>
      {plan.map((p) => (
        <div key={p.day} style={{ margin: '12px 0', padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
          <b>{p.day}</b>
          <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
