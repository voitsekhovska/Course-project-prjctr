
export const getResultFromStorage = () => {
  return JSON.parse(localStorage.getItem("results")) || [];
};

export const saveResultToStorage = (result) => {
  const results = getResultFromStorage();

  results.push(result);
  const lastTenResults = results.slice(0, 11);

  localStorage.setItem("results", JSON.stringify(lastTenResults));
};
