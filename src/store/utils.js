export function uniqueIds(date, min = 2, max = 9) {
  if (date) {
    return new Date().toISOString()
  }
  return Math.random().toString(36).substr(min, max);
}