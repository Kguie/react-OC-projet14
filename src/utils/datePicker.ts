export function handleDate(day: string, month: string, year: string) {
  let dayMaxValue = 31;
  if (month !== "") {
    const numericMonth = parseInt(month);

    if ([4, 6, 9, 11].includes(numericMonth)) {
      dayMaxValue = 30;
    } else if (numericMonth === 2) {
      const numericYear = parseInt(year);
      const isLeapYear =
        numericYear &&
        numericYear % 4 === 0 &&
        (numericYear % 100 !== 0 || numericYear % 400 === 0);

      dayMaxValue = isLeapYear ? 29 : 28;
    }
  }
  if (day !== "") {
    const numericDay = parseInt(day);
    const numericFirstPart = parseInt(day[0]);
    if (numericFirstPart > 3) {
      return `0${numericFirstPart}`;
    } else if (numericDay > dayMaxValue) {
      return dayMaxValue.toString();
    }
    return day;
  }
}
