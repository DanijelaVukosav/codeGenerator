export const DATE_TIME_FORMAT = "DD-MM-YYYY HH:mm:ss";
export const DATE_FORMAT = "DD-MM-YYYY";
export const formatDate = (date: Date, format: string) => {
  const padZero = (num: number) => (num < 10 ? "0" : "") + num;

  const year = date.getFullYear().toString();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return format.replace("YYYY", year).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
};
