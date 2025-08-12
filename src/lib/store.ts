// src/lib/store.ts
import { useEffect, useState } from "react";

export function createLocalStore<T>(key: string, init: T) {
  const read = (): T => {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : init;
  };
  const write = (v: T) => localStorage.setItem(key, JSON.stringify(v));
  return { read, write };
}

// React で使いやすいフック
export function usePersistentState<T>(key: string, init: T) {
  const store = createLocalStore<T>(key, init);
  const [state, setState] = useState<T>(store.read());
  useEffect(() => { store.write(state); }, [state]); // state 変更で保存
  return [state, setState] as const;
}
