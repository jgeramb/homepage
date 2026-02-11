export default function easeOutCubic(time: number, start: number, end: number, duration: number) {
  time = Math.min(time, duration);

  return end * ((time = time / duration - 1) * time * time + 1) + start;
}
