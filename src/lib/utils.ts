import PropTypes from 'prop-types';

export function classNames(...cs: (string | boolean | null | undefined)[]): string {
  return cs.filter(Boolean).join(' ');
}

export interface IBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function deriveBox(p: number | IBox, defaultValue: IBox): IBox {
  return {
    ...defaultValue,
    left: typeof p === 'number' ? p : p.left,
    right: typeof p === 'number' ? p : p.right,
    top: typeof p === 'number' ? p : p.top,
    bottom: typeof p === 'number' ? p : p.bottom,
  };
}

export const PADDING_PROP_TYPES = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }).isRequired,
]);

export function isArray<T>(a: unknown): a is readonly T[] {
  return Array.isArray(a);
}

export function noop(): void {
  // dummy
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EMPTY_ARR: any[] = [];
