export default function easeOutCubic(time, start, end, duration) {
  time = Math.min(time, duration);

  return end * ((time = time / duration - 1) * time * time + 1) + start;
}
