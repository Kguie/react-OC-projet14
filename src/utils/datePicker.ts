export function handleCalendarDate(day: string, month: string, year: string) {
  let dayMaxValue = 31;
  const isEmptyMonth = month === "" || month === "mm";
  const isEmptyDay = day === "" || day === "dd";
  if (!isEmptyMonth) {
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

  if (!isEmptyDay) {
    const numericDay = parseInt(day);
    const numericFirstPart = parseInt(day[0]);
    if ((month === "02" && numericFirstPart > 2) || numericFirstPart > 3) {
      return `0${numericFirstPart}`;
    }
    if (numericDay > dayMaxValue) {
      return dayMaxValue.toString();
    }
  }
  return day;
}

export function handleCalendarMonth(month: string) {
  const monthMaxValue = 12;
  const isEmptyMonth = month === "" || month === "mm";
  if (!isEmptyMonth) {
    const numericMonth = parseInt(month);
    const numericFirstPart = parseInt(month[0]);

    if (numericFirstPart > 1) return `0${numericFirstPart}`;
    if (numericMonth > monthMaxValue) return monthMaxValue.toString();
  }
  return month;
}

// export function handleCheckDate(date: string) {}
