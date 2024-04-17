
const MAX_RESULTS_IN_STORAGE = 10;

export const getResultFromStorage = () => {
  return JSON.parse(localStorage.getItem("results")) || [];
};

export const saveResultToStorage = (result) => {
  const results = getResultFromStorage();

  results.push(result);
  const lastTenResults = results.slice(0, MAX_RESULTS_IN_STORAGE);

  localStorage.setItem("results", JSON.stringify(lastTenResults));
};
