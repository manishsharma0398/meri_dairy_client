export const parseDate = (date) => {
  const m = new Date(date);
  const month = m.getMonth() + 1;
  const a = m.getDate();
  const fd = `${m.getFullYear()}-${month > 9 ? month : `0${month}`}-${
    a > 9 ? a : `0${a}`
  }`;
  return fd;
};
