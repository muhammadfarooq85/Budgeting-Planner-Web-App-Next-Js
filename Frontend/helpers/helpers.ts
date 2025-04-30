const convertDateToLocalFormat = (
  date: string | Date,
  countryFormat: string
) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString(countryFormat, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export { convertDateToLocalFormat };
