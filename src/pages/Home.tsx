import { useEffect, useState } from 'react';
import { getJpyToTwdRate } from '../lib/api';

export default function Home() {
  const [rate, setRate] = useState<number | undefined>();
  const [asOf, setAsOf] = useState<string>('');
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        // 直近値のキャッシュを先に表示
        const c = sessionStorage.getItem('fx_jpy_twd');
        if (c) {
          const v = JSON.parse(c);
          setRate(v.rate);
          setAsOf(v.at);
        }
        const fx = await getJpyToTwdRate();
        setRate(fx.rate);
        setAsOf(fx.at);
        sessionStorage.setItem('fx_jpy_twd', JSON.stringify(fx));
      } catch {
        setErr('為替の取得に失敗しました（キャッシュ表示中）');
      }
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        <strong>為替（JPY → TWD）</strong>
        <div>
          {rate ? (
            <>
              1 JPY ≈ <b>{rate.toFixed(4)}</b> TWD（{asOf}）
            </>
          ) : (
            '読み込み中…'
          )}
        </div>
        {err && <div style={{ color: 'tomato' }}>{err}</div>}
      </div>

      <div style={{ marginTop: 16 }}>
        <p>次のイベント：出国（9/20）</p>
        <p>チェック：TWAC、Lucky Land 事前登録、カード保険の決済</p>
      </div>
    </div>
  );
}
