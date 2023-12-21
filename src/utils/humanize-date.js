var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
};

export default function humanizeDate (date) {
  return new Date(date).toLocaleString('ru-RU', options);
}