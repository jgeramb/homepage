export default function easeOutElastic(time: number, start: number, end: number, duration: number) {
  time = Math.max(0, Math.min(time, duration));

  return (
    start +
    end * (Math.pow(2, -10 * (time /= duration)) * Math.sin((time * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1)
  );
}
