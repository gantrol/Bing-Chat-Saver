export const getNowWithFormat = () => {
  let date = new Date();

// Get the year, month, day, hour, minute, and second
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth() returns 0-11
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
