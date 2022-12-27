const data = [
  { id: 1, label: "January", abv: "Jan" },
  { id: 2, label: "Febraury", abv: "Feb" },
  { id: 3, label: "March", abv: "Mar" },
  { id: 4, label: "April", abv: "Apr" },
  { id: 5, label: "May", abv: "May" },
  { id: 6, label: "June", abv: "Jun" },
  { id: 7, label: "July", abv: "Jul" },
  { id: 8, label: "August", abv: "Aug" },
  { id: 9, label: "September", abv: "Sep" },
  { id: 10, label: "October", abv: "Oct" },
  { id: 11, label: "November", abv: "Nov" },
  { id: 12, label: "December", abv: "Dec" },
];

export const parseDate = (date) => {
  const m = new Date(date);
  const month = m.getMonth() + 1;
  const a = m.getDate();
  const fd = `${m.getFullYear()}-${month > 9 ? month : `0${month}`}-${
    a > 9 ? a : `0${a}`
  }`;
  return fd;
};

const getMonth = (monthId) => {
  const d = data.filter((d) => d.id.toString() === `${monthId}`);
  return d[0].abv;
};

export const parseMatingDate = (matingDate) => {
  const minMatingDate = new Date(matingDate);
  minMatingDate.setDate(minMatingDate.getDate() + 270);
  const minBirthDate = minMatingDate.getDate();
  const minBirthMonth = minMatingDate.getMonth() + 1;
  const minBirthYear = minMatingDate.getFullYear();

  const maxMatingDate = new Date(matingDate);
  maxMatingDate.setDate(maxMatingDate.getDate() + 285);
  const maxBirthDate = maxMatingDate.getDate();
  const maxBirthMonth = maxMatingDate.getMonth() + 1;
  const maxBirthYear = maxMatingDate.getFullYear();

  if (minBirthYear !== maxBirthYear)
    return (
      minBirthDate +
      " " +
      getMonth(minBirthMonth) +
      " " +
      minBirthYear +
      " to " +
      maxBirthDate +
      " " +
      getMonth(maxBirthMonth) +
      " " +
      maxBirthYear
    );

  if (minBirthMonth === maxBirthMonth)
    return `${minBirthDate} to ${maxBirthDate} ${getMonth(
      maxBirthMonth
    )} ${minBirthYear}`;

  return (
    minBirthDate +
    " " +
    getMonth(minBirthMonth) +
    " to " +
    maxBirthDate +
    " " +
    getMonth(maxBirthMonth) +
    " " +
    maxBirthYear
  );
};
