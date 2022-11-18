export const parseDate = (date) => {
  const m = new Date(date);
  const a = m.getDate();
  const fd = `${m.getFullYear()}-${m.getMonth() + 1}-${a > 9 ? a : `0${a}`}`;
  return fd;
};
