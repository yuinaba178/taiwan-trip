import axios from 'axios';

// 無料API（exchangerate.host）。前日フォールバックで“ベストエフォート”
export async function getJpyToTwdRate(): Promise<{ rate: number; at: string }> {
  try {
    const r = await axios.get('https://api.exchangerate.host/latest', {
      params: { base: 'JPY', symbols: 'TWD' },
    });
    if (r.data?.rates?.TWD) return { rate: r.data.rates.TWD, at: r.data.date };
  } catch {}
  const y = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10);
  const r2 = await axios.get(`https://api.exchangerate.host/${y}`, {
    params: { base: 'JPY', symbols: 'TWD' },
  });
  return { rate: r2.data?.rates?.TWD ?? 0, at: y };
}
