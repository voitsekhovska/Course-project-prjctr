
const API_KEY = "7RuItddOyyEXG36zJ9KfYXcTCyFdX4iX";

export const getCountriesList = async () => {
  try {
    const response = await fetch(
      `https://calendarific.com/api/v2/countries?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    return data.response.countries;
  } catch (error) {
    console.error("Error fetching countries. Please try again later.");
  }
};

export const getHolidaysList = async (country, year) => {
  try {
    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${country}&year=${year}&`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    return data.response.holidays;
  } catch (error) {
    console.error("Error fetching holidays. Please try again later.");
  }
};