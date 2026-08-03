export function generateCalendar(currentDate) {
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const startWeekDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const calendar = [];

  // espaços vazios antes do dia 1
  for (let i = 0; i < startWeekDay; i++) {
    calendar.push(null);
  }

  // números dos dias
  for (let day = 1; day <= totalDays; day++) {
    calendar.push(day);
  }

  return calendar;
}