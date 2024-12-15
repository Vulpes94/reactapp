const oneDayAgoExcludeWeekends = (date) => {
  const result = new Date(date);
  result.setDate(date.getDate() - 1);
  return [0, 6].includes(result.getDay())
    ? oneDayAgoExcludeWeekends(result)
    : result;
};

const now = new Date();
const temp = oneDayAgoExcludeWeekends(now);

function dateToYear(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var date = date.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  return year + "" + month + "" + date;
}

const newDate = dateToYear(temp);

export default newDate;
