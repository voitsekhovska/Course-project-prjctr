const API_KEY = "7RuItddOyyEXG36zJ9KfYXcTCyFdX4iX";
const API_URL = "https://calendarific.com/api/v2/";

export const getCountriesList = async () => {
  const response = await fetch(`${API_URL}countries?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Error fetching countries. Please try again later.");
  }

  const {
    response: { countries },
  } = await response.json();
  return countries;
};

export const getHolidaysList = async (country, year) => {
  const response = await fetch(
    `${API_URL}holidays?api_key=${API_KEY}&country=${country}&year=${year}`
  );

  if (!response.ok) {
    throw new Error("Error fetching holidays. Please try again later.");
  }

  const {
    response: { holidays },
  } = await response.json();
  return holidays;
};
