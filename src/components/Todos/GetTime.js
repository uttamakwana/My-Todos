export default function GetTime() {
  var currentDate = new Date();

  // Get the current hour in 12-hour format
  var hours = currentDate.getHours() % 12 || 12;

  // Get the current minutes
  var minutes = currentDate.getMinutes();

  // Get the current seconds
  var seconds = currentDate.getSeconds();

  // Get the AM/PM designation
  var amPm = hours >= 12 ? "PM" : "AM";

  // Format the time string
  var timeString = hours + ":" + minutes + ":" + seconds + " " + amPm;

  // Get the day of the month
  var day = currentDate.getDate();

  // Get the month (January = 0, February = 1, etc.)
  var monthIndex = currentDate.getMonth();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = months[monthIndex];

  // Get the year
  var year = currentDate.getFullYear();

  // Get the day of the week (Sunday = 0, Monday = 1, etc.)
  var dayIndex = currentDate.getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[dayIndex];

  // Format the day with the appropriate suffix (e.g., 1st, 2nd, 3rd)
  var daySuffix;
  if (day >= 11 && day <= 13) {
    daySuffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
    }
  }

  // Format the date string
  var dateString =
    day +
    daySuffix +
    " " +
    month +
    " " +
    year +
    " | " +
    " at " +
    timeString +
    " on " +
    dayOfWeek;
  return dateString;
}
