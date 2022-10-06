import firebase from "firebase/app";

const getDateTime = (
  timestamp: firebase.firestore.Timestamp,
  format: string
) => {
  let timestampConstructor = timestamp;
  if (typeof Object.getPrototypeOf(timestamp).toDate === "undefined") {
    timestampConstructor = new firebase.firestore.Timestamp(
      timestamp.seconds,
      timestamp.nanoseconds
    );
  }
  const date = timestampConstructor.toDate();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const dday = ("0" + day).slice(-2);
  const month = date.getMonth() + 1;
  const mmonth = ("0" + month).slice(-2);
  const year = date.getFullYear();

  const dateTime = format
    .replace(/s/g, String(seconds))
    .replace(/m/g, String(minutes))
    .replace(/h/g, String(hours))
    .replace(/DD/g, dday)
    .replace(/D/g, String(day))
    .replace(/MM/g, mmonth)
    .replace(/M/g, String(month))
    .replace(/Y/g, String(year));

  return dateTime;
};

export default getDateTime;
