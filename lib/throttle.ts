export function throttle(fnc: (...args: unknown[]) => unknown, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: unknown[]) => {
    if (!timer) {
      fnc(...args);

      timer = setTimeout(() => (timer = null), delay);
    }
  };
}
