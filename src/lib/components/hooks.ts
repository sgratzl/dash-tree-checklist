import { useRef } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
