export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let value: T = initialValue;

  const state = (): T => value;
  const setState = (newValue: T): void => {
    value = newValue;
  };

  return [state, setState];
}
